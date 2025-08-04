import api from "./api";

export async function getCaughtPokemon() {
  const res = await api.get("/pokemon/caught");
  console.log("services/pokemon.js", res.data);
  return res.data;
}

export async function catchPokemon(pokemonID) {
  const res = await api.post(`/pokemon/${pokemonID}/catch`);
  console.log("catchPokemon", res.data);
  return res.data;
}

export async function getPokemonById(pokemonID) {
  const res = await api.get(`/pokemon/${pokemonID}`);
  console.log("getPokemonInfo", res.data);
  return res.data;
}

export async function releasePokemon(pokemonID) {
  const res = await api.delete(`/pokemon/${pokemonID}/release`);
  console.log("releasePokemon", res.data);
  return res.data;
}