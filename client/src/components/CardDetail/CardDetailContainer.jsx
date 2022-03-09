import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { pokemonDetail } from '../../actions'
import NavBar from '../NavBar/NavBar'
import CardDetail from './CardDetail'
import './CardDetail.css'

function CardDetailContainer() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const getDetail = useSelector((state) => state.detail )

    useEffect(() => {
        dispatch(pokemonDetail(id))
    }, [dispatch, id])



  return (
    <div>
        <NavBar/>
        <div className='containerDetail'>
    <div className='cardDetailContainer'>
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
        <Link className='buttonBack' to='/pokemons'>Go Back</Link>

        </div>
    </div>
  )
}

export default CardDetailContainer