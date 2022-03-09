import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'

function NavBar() {
  return (
    <div class="nav">
  <input type="checkbox" id="nav-check"/>

  <div class="nav-btn">
    <label for="nav-check">
      <span></span>
      <span></span>
      <span></span>
    </label>
  </div>
  
  <div class="nav-links">
   <Link to='/pokemons' target="_blank">Pokemons</Link>
   <Link to='createPokemon' target="_blank">Create a Pokemon</Link>

  </div>
</div>
  )
}

export default NavBar