import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getAllGifPaths, getGifData } from '../lib/getGifs';

export default function GifDetail({ gifData }) {
  const [copied, setCopied] = useState(false);
  
  if (!gifData) {
    return (
      <Layout title="GIF Not Found">
        <h1>GIF Not Found</h1>
        <Link href="/">
          <a className="back-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Gallery
          </a>
        </Link>
        <p>The requested GIF could not be found.</p>
      </Layout>
    );
  }
  
  const gifName = gifData.name.replace(/\.[^/.]+$/, '');
  const gifUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/gifs/${gifData.name}`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(gifUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <Layout title={`GIF Gallery | ${gifName}`}>
      <Link href="/">
        <a className="back-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Gallery
        </a>
      </Link>
      
      <div className="gif-detail">
        <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
          <Image
            src={gifData.path}
            alt={gifName}
            width={800}
            height={600}
            layout="responsive"
            className="gif-detail-image"
            priority
          />
        </div>
        
        <div className="gif-detail-content">
          <h1>{gifName}</h1>
          
          <button
            onClick={copyToClipboard}
            className="copy-btn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            {copied ? 'Copied!' : 'Copy Direct Link'}
          </button>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllGifPaths();
  
  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const gifData = getGifData(params.gif);
  
  if (!gifData) {
    return {
      notFound: true,
    };
  }
  
  return {
    props: {
      gifData,
    },
    revalidate: 60, // Re-generate the page after 60 seconds
  };
}