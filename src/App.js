import { Routes, Route } from "react-router-dom";
import './App.css'
import PokemonList from "./layouts/PokemonList";
import PokemonDetail from "./layouts/PokemonDetail";

function App() {
  return (
    <Routes>
        {/* <Route exact path="/" children={<LoginRoute />} /> */}
        {/* <Redirect from="/" to="/pokedex" /> */}
        <Route exact path="/" />
        <Route exact path="/pokedex" element={<PokemonList/>} />
        <Route exact path="/pokedex/:id" element={<PokemonDetail/>} />
      </Routes>
  )
}

export default App
