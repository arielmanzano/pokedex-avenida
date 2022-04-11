import { Routes, Route } from "react-router-dom";
import './App.css'
import { PokemonListRoute } from "./routes/PokemonList";

function App() {
  return (
    <Routes>
        {/* <Route exact path="/" children={<LoginRoute />} /> */}
        <Route exact path="/pokedex" element={<PokemonListRoute/>}>
          {/* <NavBar />
          <CourseListRoute /> */}
        </Route>
        <Route exact path="/pokedex/:id">
          {/* <NavBar />
          <CourseDetailRoute /> */}
        </Route>
      </Routes>
  )
}

export default App
