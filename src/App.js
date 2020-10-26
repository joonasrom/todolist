import AppBar from '@material-ui/core/AppBar';

import './App.css';
import Todolist from './components/Todolist';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import React, { useState } from 'react';



function App() {

  const [value, setValue] = useState('one');

  const handleChange = (event, value) => {
    setValue(value);
  };
  return (

    <div>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}> position: center
          <Tab value="one" label="Frontpage" />
          <Tab value="two" label="Todolist" />
        </Tabs>
      </AppBar>
      {value === 'one' && <div><h1>Welcome to todolist!</h1></div>}
      {value === 'two' && <div><Todolist /></div>}
    </div>

  );
}

export default App;
