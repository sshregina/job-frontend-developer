import { TextField, Box, Button, Typography } from '@material-ui/core';
import axios from 'axios';
import React, {useState} from 'react';

function App() {
  const [data, setData] = useState([]);
  const [searchName, setSearchName] = useState('');

  const getName = (param) => {
      
    axios({
      method: 'get',
      url: `http://theaudiodb.com/api/v1/json/1/search.php?s=${param}`,
    })
    .then(response => {

      const dataAPI = response.data.artists      
      if (dataAPI === null) {
        alert('Artista ou Banda não localizado')
      } else {
        dataAPI.map(item => setData(item))        
      } 
      setSearchName('')     
    })
    .catch((console.error()
    ))
  }

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <form>
        <Box>
          <TextField variant='outlined' value={searchName} onChange={(e) => setSearchName(e.target.value)} />          
        </Box>      
      </form>
      <Button variant="contained" onClick={() => getName(searchName)}>Botão</Button>
      <Typography>{data.strArtist}</Typography>
      <Typography>{data.strGenre}</Typography>
      <Typography>{data.strCountry}</Typography>
      <Typography>{data.strWebsite}</Typography>
      <Typography>{data.strTwitter}</Typography>
    </div>
  );
}

export default App;