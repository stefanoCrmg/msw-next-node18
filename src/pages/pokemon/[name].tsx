import { useQuery } from '@tanstack/react-query'
import type { InferGetStaticPropsType, GetStaticProps } from 'next'
 
type Repo = {
  name: string | string[]
}
 
export const getServerSideProps = (async (context) => {
  const repo = { name: context.params!.name! }
  return { props: { repo } }
}) satisfies GetStaticProps<{
  repo: Repo
}>
 
export default function Page({
  repo,
}: InferGetStaticPropsType<typeof getServerSideProps>) {
  const pokeQuery = useQuery(['somePokemon'], () => fetch(`https://pokeapi.co/api/v2/pokemon/${repo.name}`).then(_ => _.json()))

  if(pokeQuery.isError)
    return <div>Error fetching: {repo.name}</div>

  if(pokeQuery.isLoading)
    return <div>Loading: {repo.name}</div>
  
  return <div>
    <div className='font-bold bg-blue-400'>Pokemon name: {repo.name}</div>
    <pre className='bg-yellow-200'>
      <code>
        {JSON.stringify(pokeQuery.data, null, 2)}
      </code>
    </pre>
    </div>
}