import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { pokemonDetail } from '../../actions'

import CardDetail from './CardDetail'
import style from './CardDetail.module.css'


function CardDetailContainer() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const getDetail = useSelector((state) => state.detail )

    useEffect(() => {
        dispatch(pokemonDetail(id))
    }, [dispatch, id])



  return (
    <div >
        <Link className={style.buttonBack} to='/pokemons'>Go Back</Link>
        <div className={style.containerDetail}>
    <div className={style.cardDetailContainer}>
        {
            <CardDetail
                key={getDetail.id}
                id={getDetail.id}
                name={getDetail.name}
                hp={getDetail.hp}
                attack={getDetail.attack}
                defense={getDetail.defense}
                speed={getDetail.speed}
                weight={getDetail.weight}
                height={getDetail.height}
                img={getDetail.img}
                types={getDetail.types}
                />
            
        }
            </div>


        </div>
    </div>
  )
}

export default CardDetailContainer