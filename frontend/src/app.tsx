import Profile from "./components/Profile"
import { Logo } from './logo'

export function App() {
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
