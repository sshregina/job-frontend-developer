import { TextField, Box, Button, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { StyleSheet, css } from 'aphrodite';
import growl from 'growl-alert';
import 'growl-alert/dist/growl-alert.css';
import logo from '../src/img/logo.png';

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
    if (name === "") {
      growl.error({text: "Insira um nome para pesquisa", fadeAway: true, fadeAwayTimeout: 3000});

    } else {
      axios({
        method: "get",
        url: `http://theaudiodb.com/api/v1/json/1/search.php?s=${name}`
      })
        .then(response => {
          const dataAPI = response.data.artists;
          if (dataAPI === null || dataAPI === "3") {          
            growl.error({text: "Artista ou Banda não localizado", fadeAway: true, fadeAwayTimeout: 3000});
          } else {
            dataAPI.forEach((item) => {
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
    <>
      <header className={css(styles.header)}>
        <img className={css(styles.logo)} src={logo} alt="Logo Intelimusic" />
      </header>

      <main className={css(styles.main)}>
    <div className="App">
      <header className="App-header"></header>
      <form className={css(styles.form)}>
        <Box className={css(styles.box)}>
          <TextField
            variant="outlined"
            value={searchName}
            onChange={e => setSearchName(e.target.value)}
          />
        </Box>
        <Button className={css(styles.btn)} variant="contained" onClick={() => getName(searchName)}>
        Buscar
      </Button>
      </form>

      <Card className={css(styles.card)}>
        <CardActionArea className={css(styles.cardArea)}>
        <img src={data.strArtistClearart} width="40%" alt='Imagem da Banda' />          
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
          <Box className={css(styles.boxweb)}>
          <a href={"https://" + data.strWebsite} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-globe" style={{color: 'white'}}></i>
          </a>
          <a href={"https://" + data.strFacebook} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f" style={{color: 'white'}}></i>
          </a>
          <a href={"https://" + data.strTwitter} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter" style={{color: 'white'}}></i>
          </a>
          <a href={"https://" + data.strLastFMChart} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-lastfm" style={{color: 'white'}}></i>
          </a>
          </Box>
        </CardActions>
      </Card>

      <ul className={css(styles.music, styles.margin)} >
     {videos.map(item =>
    <li className={css(styles.cardMusic, styles.margin)}>
      <img src={item.strTrackThumb} alt="imagem do vídeo" width="20%" height="20%"/>
      <div className={css(styles.info)}>
        <p className={css(styles.margin)}>{item.strTrack}</p>
        <a href={item.strMusicVid} target="_blank" rel="noopener noreferrer" className={css(styles.margin)}>
          <i className="fab fa-youtube" style={{fontSize: 30, color: 'white'}}></i>
        </a>
      </div>
    </li>     
    )}  
    </ul>
    </div>
    </main>
    </>
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
  },
  boxweb:{
    display: 'flex',
    justifyContent:'space-between',
    alignItems:'center',
    width: '100%',
    margin:'0 50px',
      
  },
  logo: {
    width: '30%',
    display: 'flex',
    margin: '1vh 1vh 1vh 36vw',
  },
  main: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#77A612',
    // display:'flex',
    alignItems:'center'
  },
  btn: {
    backgroundColor: '#c9d9a7',
    width: '10%',
    height: '10%',
    fontSize: '10px',
    borderRadius: '5px solid',
    margin: 'auto',
  },
  
  form: {
    display: 'flex',
    marginLeft:'60px'
  },
  box: {
    backgroundColor: '#c9d9a7',  

  },
  cardArea: {
    display: 'flex',
    justifyContent: 'center',
  }

  //   '@media only screen and (max-width:2000px)': {
});