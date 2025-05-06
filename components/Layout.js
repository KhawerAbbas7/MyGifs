import { useState, useEffect } from 'react';
import Head from 'next/head';
import ThemeToggle from './ThemeToggle';
import Footer from './Footer';

export default function Layout({ children, title = 'GIF Gallery' }) {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="A beautiful GIF gallery" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      
      <main className="container">
        {children}
      </main>
      
      <Footer />
    </>
  );
}