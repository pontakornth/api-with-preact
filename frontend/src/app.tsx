import Profile, { ProfileProps } from "./components/Profile"
import { Logo } from './logo'
import useSWR from "swr"
import {useCallback, useState} from "preact/hooks"
import debounce from "lodash.debounce"

type ErrorMessage = {
  message: string;
  code: number;
}

type Response = ProfileProps[] | ErrorMessage;

export function App() {
  const [displayName, setDisplayName] = useState("Yuno")
  const [name, setName] = useState("Yuno")

  const { data,error } = useSWR<any>(() => name && `http://localhost:1313/character?name=${name}`)

  const debounceInput = useCallback(debounce((name: string) => {
    setName(name)
    console.log(data)
    console.log(name)
  }, 1000), [])

  const handleChange = (e: Event) => {
    setDisplayName((e.target as HTMLInputElement).value)
    debounceInput((e.target as HTMLInputElement).value)
  }
  
  const displayData = () => {
    if (error) return <p>{error}</p>
    if (!data) return <p>loading..</p>
    return (
      <>
      {data.map(x => (
        <Profile name={x.name} age={x.age} anime={x.anime} key={x.name}/>
      ))}
      </>
    )
  }

  return (
    <>
      <label for="name">Name</label>
      <input type="text" onChange={handleChange} value={displayName} name="name" />
      <div class="grid">
        {displayData()}
      </div>
    </>
  )
}
