import React from 'react'
import './Pagination.css'

function Pagination({pages, catchPokemon, pokePagination}) {


    const pageNumber = []
    
    //MathCeil redondea para arrriba 12*1
    for(let i=1; i <= Math.ceil(catchPokemon/pages); i++){
        pageNumber.push(i)
    }
    console.log(catchPokemon)
    console.log(pages)
    console.log(pageNumber)
  return (

    <div className='pagination'>
        <ul>
            {

                pageNumber?.map(n => {
                    return <li key={n} onClick={() => pokePagination(n)}> {n}  </li>
                })
            }
        </ul>
    </div>
  )
}

export default Pagination

