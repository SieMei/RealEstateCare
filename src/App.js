import React from 'react';
import './/App.css';
import logo from './rec-logo.png';

function App() {
  return (
    <div className="App-container">
      <h1>Hallo, welkom bij Real Estate Care</h1>
      <p className="App-text">Voor al je inspectiewerkzaamheden.</p>
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
}

export default App;