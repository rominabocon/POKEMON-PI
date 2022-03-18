import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { catchAllPokemon, getAllTypes } from '../../actions'
import './LandingPage.css'

function LandingPage() {

  const dispatch = useDispatch()

  
  useEffect(() => {
    dispatch(getAllTypes())
    dispatch(catchAllPokemon())
  }, [dispatch])

  return (
    <div className='container'>
    <div  className='backgroundImage'>
      <div>
        <Link to='/pokemons'> <button className='buttonLanding'> CATCH THEM ALL!</button> </Link>
      </div>
    </div>
    </div>

  )
}

export default LandingPage