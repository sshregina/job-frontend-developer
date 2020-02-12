import { TextField, Box, Button, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { StyleSheet, css } from 'aphrodite';

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
      .catch(console.error());
  };

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
          dataAPI.map(item => {
            setData(item)
            getVideos(item.idArtist)
          });                   
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
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
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
      <ul className={css(styles.music, styles.margin)} >
     {videos.map(item =>
    <li className={css(styles.cardMusic, styles.margin)}>
      <img src={item.strTrackThumb} alt="imagem do vídeo" width="20%" height="20%"/>
      <div className={css(styles.info)}>
        <p className={css(styles.margin)}>{item.strTrack}</p>
        <a href={item.strMusicVid} target="_blank" rel="noopener noreferrer" className={css(styles.margin)}>
          <i className="fab fa-youtube" style={{fontSize: 30}}></i>
        </a>
      </div>
    </li>     
    )}  
    </ul>
    </div>
  );
}



export default App;

const styles = StyleSheet.create({
  cardMusic: {
    display: 'flex',
  },
  music: {
    padding: '0' 
  },
  info: {
    width: '100%'
  },
  margin: {
    margin: '2%'
  }
  // red: {
  //     backgroundColor: 'red'
  // },

  // blue: {
  //     backgroundColor: 'blue'
  // },

  // hover: {
  //     ':hover': {
  //         backgroundColor: 'red'
  //     }
  // },

  // small: {
  //     '@media (min-width: 600px)': {
  //         backgroundColor: 'red',
  //     }
  // }
});