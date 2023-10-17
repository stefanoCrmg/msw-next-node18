import { db } from "./db"

export const getPokemon = () => {
  return db.pokemon.getAll()
}

export const addPokemon = () => {
  return db.pokemon.create({ name: 'Ditto'})
}