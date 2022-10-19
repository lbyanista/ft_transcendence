import React from 'react';
import './App.css';

const AllChat = () => {
  return (
  <div>
    <input style={{ height:50  }} type={"text"} placeholder={"Type ..."} />
    <button type="submit" style={{ color:"aqua", background:"black", height:55 }}>Send </button>
  </div>
  );
};

function App() {
  return (
    <div>
      <AllChat/>
    </div>
  );
}

export default App;
