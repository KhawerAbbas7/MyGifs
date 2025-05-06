import Link from 'next/link';
import Image from 'next/image';

export default function GifCard({ gif }) {
  console.log(gif)
  return (
    <div className="card">
      <Link href={`/${encodeURIComponent(gif.name)}`}>
        <a>
          <div className="card-image">
            <img src={`https://khawigifs.vercel.app${gif.path}`}
      alt={gif.name}
      style={{ width: '100%', height: 'auto%', objectFit: 'cover' }}
   />
          </div>
          <div className="card-content">
            <h3>{gif.name.replace(/\.[^/.]+$/, '')}</h3>
          </div>
        </a>
      </Link>
    </div>
  );
}