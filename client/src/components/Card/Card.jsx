import React from 'react'
import { Link } from 'react-router-dom'
import './Card.css'
function Card({name, id, img, types}) {

  if(typeof types[0] !== 'string') {
    types = types.map (t => t.name)
  }


  return (

    <div className='cardcomponent' key={id}>

        <h3>{name.toUpperCase()}</h3>
 
        <Link to={`/pokemons/${id}`}><img className='pokeImg' src={img} alt={id}/></Link>
        <p>{types.join(', ').toUpperCase()}</p>

        
    </div>
  )
}

export default Card