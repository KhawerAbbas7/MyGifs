// Vercel serverless function
const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  const gifsDir = path.resolve('./gifs');
  fs.readdir(gifsDir, (err, files) => {
    if (err) return res.status(500).json({ error: 'Failed to read gifs' });
    const gifs = files.filter(file => file.endsWith('.gif'));
    res.status(200).json(gifs);
  });
}
