import api from "./api";

export async function getCaughtPokemon() {
  const res = await api.get("/pokemon/caught");
  console.log("services/pokemon.js", res.data);
  return res.data;
}

export async function catchPokemon(pokemonID) {
  const res = await api.post(`/pokemon/${pokemonID}/catch`);
  // console.log("services/pokemon.js", res.data);
  return res.data;
}