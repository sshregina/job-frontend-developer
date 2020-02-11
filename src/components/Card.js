import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

export default function MediaCard(props) {
  return (
    <Card>
      <CardActionArea>
        <CardMedia 
          image={props.image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.artist}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.genre}
            {props.country}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <a href={props.site}></a>
        <a href={props.facebook}></a>
        <a href={props.instagram}><i class="fab fa-instagram"></i></a>
        <a href={props.twitter}></a>
        <a href={props.lastfm}><i class="fab fa-lastfm"></i></a>
      </CardActions>
    </Card>
  );
}
