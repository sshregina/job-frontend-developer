import { TextField, Box, Button, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

function App() {
  const [data, setData] = useState([]);  
  const [searchName, setSearchName] = useState("");

  const getName = (name) => {
    axios({
      method: "get",
      url: `http://theaudiodb.com/api/v1/json/1/search.php?s=${name}`
    })
      .then(response => {
        const dataAPI = response.data.artists;
        if (dataAPI === null) {
          alert("Artista ou Banda não localizado");
        } else {
          dataAPI.map(item => setData(item));          
        }
        setSearchName('')
      })
      .catch(console.error());
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      <form>
        <Box>
          <TextField
            variant="outlined"
            value={searchName}
            onChange={e => setSearchName(e.target.value)}
          />
        </Box>
      </form>
      <Button variant="contained" onClick={() => getName(searchName)}>
        Botão
      </Button>
      <Card>
        <CardActionArea>
          <CardMedia />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {data.strArtist}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {data.strGenre}
              {data.strCountry}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <a href={"https://" + data.strWebsite} target="_blank" rel="noopener noreferrer">
            Site
          </a>
          <a href={"https://" + data.strFacebook} target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
          <a href={"https://" + data.strInstagram} target="_blank" rel="noopener noreferrer">
            <i class="fab fa-instagram">Insta</i>
          </a>
          <a href={"https://" + data.strTwitter} target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
          <a href={"https://" + data.strLastFMChart} target="_blank" rel="noopener noreferrer">
            <i class="fab fa-lastfm"></i>
          </a>
        </CardActions>
      </Card> 
    </div>
  );
}

export default App;
