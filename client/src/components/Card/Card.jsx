import React from 'react'
import { Link } from 'react-router-dom'

function Card({name, id, img, types}) {

  if(typeof types[0] !== 'string') {
    types = types.map (t => t.name)
  }


  return (

    <div key={id}>
      
        <h1>{name.toLowerCase()}</h1>
        <Link to={`/pokemons/${id}`}><img src={img} alt={id}/></Link>
        <p>{types.join(', ')}</p>

        
    </div>
  )
}

export default Card