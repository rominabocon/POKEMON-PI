import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div>
        <Link to='/'>Home</Link>
        <Link to='/pokemons'> Pokemons</Link>
    </div>
  )
}

export default NavBar