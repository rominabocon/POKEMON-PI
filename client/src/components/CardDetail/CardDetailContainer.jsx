import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import { deletePokemon, pokemonDetail, removeDetail } from '../../actions'
import CardDetail from './CardDetail'
import style from './CardDetail.module.css'


function CardDetailContainer() {
    const {id} = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const getDetail = useSelector((state) => state.detail )


    useEffect(() => {
        dispatch(pokemonDetail(id))
    }, [dispatch, id])

    function handleDeleteDetail () {
        dispatch(removeDetail())
    }

    
    const removeFunction = e => {
        dispatch(deletePokemon({
            id: e.target.value
        }));
        history.push('/pokemons')

    }
return (
    <div >
        <Link className={style.buttonBack} onClick={e=> handleDeleteDetail(e)} to='/pokemons'>Go Back</Link>
        <div className={style.containerDetail}>
    <div className={style.cardDetailContainer}>
        { getDetail <= 0 
        ? <img className={style.loading} src={'https://weichiachang.github.io/pokemon-master/img/loading.45600eb9.gif'} alt='wait for your pokemons'/>
        : <CardDetail
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
                remove={true}
                removeFunction={removeFunction}
                />
            
        }
            </div>


        </div>
    </div>
)
}

export default CardDetailContainer