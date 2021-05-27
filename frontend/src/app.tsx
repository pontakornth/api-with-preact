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
  const [displayName, setDisplayName] = useState("")
  const [name, setName] = useState("")
  const { data,error } = useSWR<Response>(() => `localhost:1313/character?name=${name}`)

  const debounceInput = useCallback(debounce((name: string) => {
    setName(name)
    console.log(name)
  }, 1000), [])

  const handleChange = (e: Event) => {
    setDisplayName((e.target as HTMLInputElement).value)
    debounceInput((e.target as HTMLInputElement).value)
  }

  return (
    <>
      <label for="name">Name</label>
      <input type="text" onChange={handleChange} name="name" />
      <div class="grid">
        <Profile name="Yuno" age={18} anime="Black Clover" />
        <Profile name="Asta" age={18} anime="Black Clover" />
      </div>
    </>
  )
}
