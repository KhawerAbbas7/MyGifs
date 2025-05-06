import { useState } from 'react';
import Layout from '../components/Layout';
import GifCard from '../components/GifCard';
import { getGifs } from '../lib/getGifs';

export default function Home({ gifs }) {
  const [query, setQuery] = useState('');

  const filteredGifs = gifs.filter((gif) =>
    gif.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Layout title="GIF Gallery | Home">
      <h1>GIF Gallery</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search GIFs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: '0.5rem',
          marginBottom: '1rem',
          width: '100%',
          maxWidth: '400px',
          borderRadius: '8px',
          border: '1px solid #ccc',
        }}
      />

      <div className="grid">
        {filteredGifs.map((gif) => (
          <GifCard key={gif.id} gif={gif} />
        ))}
        {filteredGifs.length === 0 && (
          <p>No GIFs found. Try a different search.</p>
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
