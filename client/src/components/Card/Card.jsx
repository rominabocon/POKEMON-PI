import React from 'react'
import { Link } from 'react-router-dom'
import style from './Card.module.css'

function Card({name, id, img, types, remove, removeFunction}) {

  if(typeof types[0] !== 'string') {
    types = types.map (t => t.name)
  }


  return (

    <div className={style.flipCard} key={id}>
       {
        remove && <button name='id' value={id} onClick={e => removeFunction(e)} >X</button>
      }
        <Link to={`/pokemons/${id}`}>
        <div className={style.flipCardInner}>
          <div className={style.flipCardFront}>
            <img className={style.pokeImg} src={img} alt={id}/>
          </div>
          <div className={style.flipCardBack}>
            <h2>{name.toUpperCase()}</h2>
            <h4>TYPES: </h4>
            <p>{types.join(", ").toUpperCase()}</p>
          </div>
        </div>
    </Link>
    </div>
  )
}

export default Card