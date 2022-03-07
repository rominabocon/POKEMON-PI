import React from 'react'

function CardDetail({id, name, hp, attack, defense, speed, weight, height, img, types}) {
  


  return (
    <div key={id}>
        <h1>{name}</h1>
        <img src={img} alt={id}/>
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
  )
}

export default CardDetail


