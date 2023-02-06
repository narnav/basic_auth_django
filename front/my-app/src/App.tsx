import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Login } from './features/login/Login';
import Students from './features/login/Students';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Login></Login>
        <Students></Students>
      </header>
    </div>
  );
}

export default App;
