'use client';

import { useState } from 'react';

export default function Home() {
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);

  async function generateNickname() {
    setLoading(true);
    const res = await fetch('/api/generate-nickname');
    const data = await res.json();
    setNickname(data.nickname);
    setLoading(false);
  }

  return (
    <main style={{
      fontFamily: 'cursive',
      minHeight: '100vh',
      backgroundColor: '#ffe4e1',
      padding: '2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        backgroundColor: '#fff0f5',
        padding: '2rem',
        borderRadius: '1.5rem',
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        textAlign: 'center',
        maxWidth: '500px',
        width: '100%'
      }}>
        <h1 style={{ fontSize: '2rem', color: '#d63384' }}>Sujay, you are my 🍓</h1>
        <button onClick={generateNickname} disabled={loading} style={{
          marginTop: '1.5rem',
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          color: 'white',
          backgroundColor: '#d63384',
          border: 'none',
          borderRadius: '1rem',
          cursor: 'pointer'
        }}>
          {loading ? 'Generating...' : 'Generate Nickname'}
        </button>
        {nickname && (
          <p style={{ marginTop: '2rem', fontSize: '1.2rem', whiteSpace: 'pre-line' }}>
            {nickname} 💖
          </p>
        )}
      </div>
    </main>
  );
}
