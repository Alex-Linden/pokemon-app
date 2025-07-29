import api from "./api";

export async function getCaughtPokemon() {
  const res = await api.get("/pokemon/caught");
  console.log("services/pokemon.js", res.data);
  return res.data; // or whatever key your backend uses
}