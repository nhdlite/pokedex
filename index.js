'use strict';

const express = require('express');
let pokemonInfo = require('./pokemonInfo');

const URL = 'localhost';
const PORT = 3000;

(function() {
  pokemonInfo = pokemonInfo.map((data) => {
    data.imageUrl = `${URL}:${PORT}/${data.imageUrl}`;
    return data;
  })
}
)()

let app = express();

function getPokemonInfo(name) {
  return pokemonInfo.find((pokemon) => {
    return pokemon.name.toLowerCase() === name.toLowerCase();
  });
}

app.get('/pokemon', (req, res) => {
  res.send(JSON.stringify(pokemonInfo));
});

app.get('/pokemon/:pokemonName', (req, res) => {
  const info = getPokemonInfo(req.params.pokemonName);
  res.send(JSON.stringify(info));
});

app.use(express.static('media'));

app.listen(PORT, URL);
