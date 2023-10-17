import { http } from 'msw'
import { addPokemon, getPokemon } from './dbOperations'

export const handlers = [
  http.get('/api/pokemon/gengar', ({ request, params }) => {
    return new Response (JSON.stringify(getPokemon()), { status: 200 })
  }),
  http.post('/api/pokemon/add', ({ request, params }) => {
    addPokemon()
    return new Response(null, { status: 204 })
  })
]