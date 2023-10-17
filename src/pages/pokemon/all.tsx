import { useQuery } from '@tanstack/react-query'
 
export default function Page() {
  const pokeQuery = useQuery(['allPokemons-diff-query-key'], () => fetch(`/api/pokemon/gengar`).then(_ => _.json()))

  if(pokeQuery.isError)
    return <div>Error fetching</div>

  if(pokeQuery.isLoading)
    return <div>Loading</div>
  
  return <div>
    <pre className='bg-yellow-200'>
      <code>
        {JSON.stringify(pokeQuery.data, null, 2)}
      </code>
    </pre>
    </div>
}