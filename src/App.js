import { TextField, Box, Button, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { StyleSheet, css } from 'aphrodite';
import logo from '../src/img/logo.png';
import { borderBottom } from "@material-ui/system";


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
    <>
      <header className={css(style.header)}>
        <img className={css(style.logo)} src={logo} alt="Logo Intelimusic" />
      </header>

      <main className={css(style.main)}>
        <div className="App">
          <header className="App-header"></header>
          <form className={css(style.form)}>
            <Box className={css(style.box)}>
              <TextField
                variant="outlined"
                value={searchName}
                onChange={e => setSearchName(e.target.value)}
              />
            </Box>
            <Button className={css(style.btn)} variant="contained" onClick={() => getName(searchName)}>
              Buscar
          </Button>
          </form>
          <Card className={css(style.card)}>
            <CardActionArea className={css(style.cardArea)}>
              <img src={data.strArtistClearart} width="20%" />
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
        </div>
      </main>
    </>
  );
}

const style = StyleSheet.create({

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
    display: 'flex'
  },
  box: {
    backgroundColor: '#c9d9a7',
    margin: '3px',

  },
  cardArea: {
    display: 'flex',
    justifyContent: 'center',
  }

  //   '@media only screen and (max-width:2000px)': {

});

export default App;
