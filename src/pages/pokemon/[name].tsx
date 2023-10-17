import { useMutation, useQuery } from '@tanstack/react-query'
import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import Link from 'next/link'
 
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
  const pokeQuery = useQuery(['somePokemon'], () => fetch(`/api/pokemon/${repo.name}`).then(_ => _.json()))
  const pokeMutation = useMutation(['putPokemon'], () => fetch('/api/pokemon/add', { method: 'POST'}), { onSuccess: () => pokeQuery.refetch()})

  if(pokeQuery.isError)
    return <div>Error fetching: {repo.name}</div>

  if(pokeQuery.isLoading)
    return <div>Loading: {repo.name}</div>
  
  return <div>
    <div className='font-bold bg-blue-400'>Pokemon name: {repo.name}</div>
    <button onClick={() => pokeMutation.mutate()}>Aggiungi</button>
    <pre className='bg-yellow-200'>
      <code>
        {JSON.stringify(pokeQuery.data, null, 2)}
      </code>
    </pre>
    <Link href='/pokemon/all'>Vai a all</Link>
    </div>
}