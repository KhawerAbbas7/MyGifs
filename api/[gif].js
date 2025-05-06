import fs from 'fs/promises';
import path from 'path';

export default async (req, res) => {
    const { gif } = req.query;
    const gifName = `${gif}.gif`;
    const gifPath = `/gifs/${gifName}`;

    const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${gifName}</title>
            <link rel="stylesheet" href="/style.css">
            <style>
                body { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; }
                .gif-container { text-align: center; }
                img { max-width: 90%; height: auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); }
                button { padding: 0.5rem 1rem; margin-top: 1rem; background-color: #333; color: #fff; border: none; border-radius: 5px; cursor: pointer; }
                button:hover { background-color: #555; }
            </style>
        </head>
        <body class="dark-mode">
            <header>
                <h1>${gifName}</h1>
                <button id="theme-toggle">Light Mode</button>
            </header>
            <main class="gif-container">
                <img src="${gifPath}" alt="${gifName}">
                <button id="copy-link-button">Copy Direct Link</button>
            </main>
            <footer>
                <p>&copy; 2025 <a href="YOUR_WEBSITE_LINK" target="_blank">Khawer Abbas</a></p>
            </footer>
            <script>
                document.addEventListener('DOMContentLoaded', () => {
                    const copyLinkButton = document.getElementById('copy-link-button');
                    const themeToggle = document.getElementById('theme-toggle');
                    const body = document.body;

                    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
                    if (isDarkMode) {
                        body.classList.add('dark-mode');
                        themeToggle.textContent = 'Light Mode';
                    } else {
                        themeToggle.textContent = 'Dark Mode';
                    }

                    themeToggle.addEventListener('click', () => {
                        body.classList.toggle('dark-mode');
                        const isCurrentlyDarkMode = body.classList.contains('dark-mode');
                        themeToggle.textContent = isCurrentlyDarkMode ? 'Light Mode' : 'Dark Mode';
                        localStorage.setItem('darkMode', isCurrentlyDarkMode ? 'enabled' : 'disabled');
                    });

                    copyLinkButton.addEventListener('click', () => {
                        const currentURL = window.location.href;
                        navigator.clipboard.writeText(currentURL)
                            .then(() => alert('Link copied!'))
                            .catch(err => console.error('Could not copy text: ', err));
                    });
                });
            </script>
        </body>
        </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
};
