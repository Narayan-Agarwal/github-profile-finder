import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  const fetchProfile = async () => {
    setError('');
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const data = await response.json();
      setProfile(data);
    } catch (err) {
      setError(err.message);
      setProfile(null);
    }
  };

  return (
    <body>
      
    <div className="app">
      <h1>GitHub Profile Finder</h1>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={fetchProfile}>Find Profile</button>
      {error && <p className="error">{error}</p>}
      {profile && (
        <div className="profile">
          <div class='image'>
          <img src={profile.avatar_url} alt={`${profile.login}'s avatar`} />
          </div>
          <div class='info'>
           <a href={profile.html_url} target="_blank" rel="noopener noreferrer">View Profile</a><br></br>
           
          <h2>{profile.name}</h2>
          <p>Username: {profile.login}</p>
          <p>Followers: {profile.followers}</p>
          <p>Following: {profile.following}</p>
          <p>Public Repos: {profile.public_repos}</p>
        </div>
        </div>
      )}
    </div>
    
    </body>
  );
};

export default App;
