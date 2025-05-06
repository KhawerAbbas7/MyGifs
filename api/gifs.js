import fs from 'fs/promises';
import path from 'path';

export default async (req, res) => {
    try {
        const gifsDirectory = path.join(process.cwd(), 'gifs');
        const files = await fs.readdir(gifsDirectory);
        const gifFiles = files.filter(file => file.endsWith('.gif'));
        res.status(200).json(gifFiles.map(name => ({ name })));
    } catch (error) {
        console.error("Error reading GIFs directory:", error);
        res.status(500).json({ error: 'Failed to read GIF directory' });
    }
};
