import Link from 'next/link';
import Image from 'next/image';

export default function GifCard({ gif }) {
  return (
    <div className="card">
      <Link href={`/${encodeURIComponent(gif.name)}`}>
        <a>
          <div className="card-image">
            <Image 
              src={`/gifs/${gif.name}`}
              alt={gif.name}
              layout="fill"
              objectFit="cover"
              priority
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