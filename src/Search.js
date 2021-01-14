import React, { useState } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function Search() {
  const classes = useStyles();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [player, setPlayer] = useState("");
  const [allPlayers] = useState([]);

  const url = "https://www.balldontlie.io/api/v1/players?per_page=100&search=";
  const getPlayer = (event) => {
    event.preventDefault();
    axios.get(url + lastName)
    .then(response => {
      setPlayer(response.data);
      searchPlayer(response.data);
    })
    .catch(error => error);
  }

  // search for the player given by input
  const searchPlayer = (p) => {
    if(firstName==='' && lastName==='') {
      alert("Please enter a name");
      return;
    }
  const obj = p.data.find(element => element.last_name.toUpperCase()===lastName.toUpperCase() && element.first_name.toUpperCase() === firstName.toUpperCase());
     // if obj not set to anything, player wasn't found/d.n.e
    if(obj===undefined) {
      alert(`Could not find ${firstName} ${lastName}`);
      return;
    }
    setPlayer(obj);
    addPlayer(obj);
  }

  // add player to the array to pass to display.js
  const addPlayer = (p) => {
    // if player already in array, don't add
    if(allPlayers.find(element => element===p.id)) {
      alert(`Already added ${p.first_name + " " + p.last_name}`);
      return;
    }
    
    // add to array
    allPlayers.push(p.id);

    // clear textfields after successful input
    setFirstName('');
    setLastName('');
    console.log(allPlayers);
  }

  return (
    <div>
      <Grid container spacing={3} direction="row" justify="center" alignItems="flex-start">
        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="standard-basic" value={firstName} label="First Name" onChange={event => setFirstName(event.target.value)}/>
          <TextField id="standard-basic" value={lastName} label="Last Name" onChange={event => setLastName(event.target.value)}/>
        </form>
        <Button style={{marginTop:15}} variant="outlined" onClick={getPlayer}>Enter</Button>
      </Grid>
      <h1>{firstName + " " + lastName}</h1>
    </div>
  );
}

export default Search;
