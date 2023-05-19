import React, { useState } from 'react';
import Toolbar from './Components/Toolbar';
import TextEditor from './Components/TextEditor';
import Sidebar from './Components/Sidebar';
import './App.css';
import AllRoutes from './Routes/AllRoutes';
import Home from './Pages/Home';
import Login from './Pages/Login';

const App = () => {
  const [content, setContent] = useState('');

  const handleTextChange = (newContent) => {
    setContent(newContent);
  };

  return (
    <div className="app">
      {/* <Toolbar />
      <div className="content-container">
        <Sidebar />
        <TextEditor content={content} onTextChange={handleTextChange} />
      </div> */}
      <AllRoutes/>
      {/* <Login/> */}
    </div>
  );
};

export default App;
