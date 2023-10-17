import { faker } from '@faker-js/faker'
import { factory, primaryKey } from '@mswjs/data'

export const db = factory({
  pokemon: {
    id: primaryKey(faker.string.alphanumeric),
    name: () => 'string'
  }
})

db.pokemon.create({ name: 'Gengar'})
