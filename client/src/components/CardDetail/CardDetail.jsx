import React from 'react'
import style from './CardDetail.module.css'

function CardDetail({id, name, hp, attack, defense, speed, weight, height, img, types,  remove, removeFunction}) {
  


  return (
    <div className={style.card} key={id}>
        <div className={style.mainInformation}>
          <h1 style={{"textTransform": "uppercase"}}>{name}</h1>
          <img className={style.imgDetail} src={img} alt={id}/>
        </div>
        <div className={style.container}>
          <p>HP: {hp}</p>
          <p>Identification: {id}</p>
          <p>Attack: {attack}</p>
          <p>Defense: {defense}</p>
          <p>Speed: {speed}</p>
          <p>Weight: {weight}</p>
          <p>Height: {height}</p>

          <div>
            <p>Types: {types?.map(t => t).join(", ")}</p>
          </div>
        </div>
        {
        remove && <button name='id' className={style.deleteButton} value={id} onClick={e => removeFunction(e)} >X</button>
      } 

    </div>
  )
}

export default CardDetail


