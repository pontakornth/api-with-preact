import Profile from "./components/Profile"
import { Logo } from './logo'
import useSWR from "swr"
import {useState} from "preact/hooks"

export function App() {
  const [name, setName] = useState("")
  const { data,error} = useSWR(() => `localhost:1313/character?name=${name}`)
  return (
    <>
      <label for="name">Name</label>
      <input type="text" name="name" />
      <div class="grid">
        <Profile name="Yuno" age={18} anime="Black Clover" />
        <Profile name="Asta" age={18} anime="Black Clover" />
      </div>
    </>
  )
}
