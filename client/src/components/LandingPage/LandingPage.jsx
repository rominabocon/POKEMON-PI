import React from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css'

function LandingPage() {
  return (
    <div className='container'>
    <div  className='backgroundImage'>
      <div>
        <Link to='/pokemons'> <button> CATCH THEM ALL!</button> </Link>
      </div>
    </div>
    </div>

  )
}

export default LandingPage