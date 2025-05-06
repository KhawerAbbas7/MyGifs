import Layout from '../components/Layout';
import GifCard from '../components/GifCard';
import { getGifs } from '../lib/getGifs';

export default function Home({ gifs }) {
  return (
    <Layout title="GIF Gallery | Home">
      <h1>GIF Gallery</h1>
      <div className="grid">
        {gifs.map((gif) => (
          <GifCard key={gif.id} gif={gif} />
        ))}
        {gifs.length === 0 && (
          <p>No GIFs found. Please add some GIFs to the /public/gifs folder.</p>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const gifs = getGifs();
  
  return {
    props: {
      gifs,
    },
  };
}