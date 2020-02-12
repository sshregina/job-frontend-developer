import { TextField, Box, Button, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import growl from 'growl-alert';
import 'growl-alert/dist/growl-alert.css';

function App() {
  const [data, setData] = useState([]);  
  const [searchName, setSearchName] = useState("");
  const [videos, setVideos] = useState([]);   
  
  const getVideos = (idArtist) => {
    
    axios({
      method: "get",
      url: `http://theaudiodb.com/api/v1/json/1/mvid.php?i=${idArtist}`
    })
      .then(response => {
        setVideos(response.data.mvids)
      })
      .catch(console.error())
  };

  const getName = (name) => {
    if (name === "") {
      growl.error({text: "Insira um nome para pesquisa", fadeAway: true, fadeAwayTimeout: 3000});

    } else {
      axios({
        method: "get",
        url: `http://theaudiodb.com/api/v1/json/1/search.php?s=${name}`
      })
        .then(response => {
          const dataAPI = response.data.artists;
          if (dataAPI === null || 3) {          
            growl.error({text: "Artista ou Banda não localizado", fadeAway: true, fadeAwayTimeout: 3000});
          } else {
            dataAPI.map(item => {
              setData(item)
              getVideos(item.idArtist)
            });                   
          }                
          setSearchName('')
        })
        .catch(console.error());
    }      
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
            <i class="fas fa-globe"></i>
          </a>
          <a href={"https://" + data.strFacebook} target="_blank" rel="noopener noreferrer">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href={"https://" + data.strTwitter} target="_blank" rel="noopener noreferrer">
            <i class="fab fa-twitter"></i>
          </a>
          <a href={"https://" + data.strLastFMChart} target="_blank" rel="noopener noreferrer">
            <i class="fab fa-lastfm"></i>
          </a>
        </CardActions>
      </Card>     
     {videos.map(item =>
     <div>
      <img src={item.strTrackThumb} alt="imagem do vídeo" width="20%" height="20%"/>
      <p>{item.strTrack}</p>
      <a href={item.strMusicVid} target="_blank" rel="noopener noreferrer"><i class="fab fa-youtube"></i></a>
      </div>     
    )}  
    </div>
  );
}

export default App;
