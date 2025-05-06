document.addEventListener('DOMContentLoaded', async () => {
    const gifListContainer = document.getElementById('gif-list');
    const themeToggle = document.getElementById('theme-toggle');
    const searchInput = document.getElementById('search-input');
    const body = document.body;
    let allGifs = [];

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

    async function loadGifs(searchTerm = '') {
        gifListContainer.innerHTML = '';
        const filteredGifs = searchTerm
            ? allGifs.filter(gif => gif.name.toLowerCase().includes(searchTerm.toLowerCase()))
            : allGifs;

        filteredGifs.forEach(gif => {
            const gifItem = document.createElement('div');
            gifItem.classList.add('gif-item');

            const link = document.createElement('a');
            link.href = `/${gif.name.replace(/\.gif$/, '')}`;

            const img = document.createElement('img');
            img.src = `/gifs/${gif.name}`;
            img.alt = gif.name;

            link.appendChild(img);
            gifItem.appendChild(link);
            gifListContainer.appendChild(gifItem);
        });

        if (filteredGifs.length === 0 && searchTerm) {
            gifListContainer.innerHTML = '<p>No GIFs found matching your search.</p>';
        }
    }

    try {
        const response = await fetch('/api/gifs');
        allGifs = await response.json();
        await loadGifs();
    } catch (error) {
        console.error("Could not fetch GIF list:", error);
        gifListContainer.innerHTML = '<p>Failed to load GIFs.</p>';
    }

    searchInput.addEventListener('input', () => {
        loadGifs(searchInput.value.trim());
    });
});
