import fs from 'fs';
import path from 'path';

export function getGifs() {
  const gifsDirectory = path.join(process.cwd(), 'public/gifs');
  
  try {
    const fileNames = fs.readdirSync(gifsDirectory);
    
    const gifs = fileNames
      .filter(fileName => {
        const extension = fileName.toLowerCase().split('.').pop();
        return extension === 'gif';
      })
      .map(fileName => {
        return {
          id: fileName.replace(/\.gif$/, ''),
          name: fileName,
          path: `/gifs/${fileName}`
        };
      });
    
    return gifs;
  } catch (error) {
    console.error('Error reading GIFs directory:', error);
    return [];
  }
}

export function getAllGifPaths() {
  const gifs = getGifs();
  
  return gifs.map(gif => ({
    params: {
      gif: gif.name
    }
  }));
}

export function getGifData(gifName) {
  const gifs = getGifs();
  const gif = gifs.find(g => g.name === gifName);
  
  if (!gif) {
    return null;
  }
  
  return {
    id: gif.id,
    name: gif.name,
    path: gif.path
  };
}