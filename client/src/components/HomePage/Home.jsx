import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { catchAllPokemon, getAllTypes } from '../../actions'
import CardContainer from '../Card/CardContainer'
import Filters from '../Filters/Filters'
import SearchPokemon from '../SearchPokemon/SearchPokemon'
import style from './Home.module.css'


function Home() {
  const [order, setOrder] = useState("")
  const [pagination, setPagination] = useState(1)
  const [pages] = useState(12)
  const dispatch = useDispatch()
  const catchPokemon = useSelector((state) => state.pokemons)

  const getTypes = useSelector((state) => state.types)
  

  useEffect(() => {
    dispatch(getAllTypes())
    dispatch(catchAllPokemon())
  }, [dispatch])

  return (
      <div className={style.homePage}> 
      <SearchPokemon/>
      <Filters
        catchAllPokemon={catchAllPokemon}
        setPagination={setPagination}
        setOrder={setOrder}
        getTypes={getTypes} 
      />
    {
    catchPokemon <= 0 
    ?  <img className={style.loading} src={'https://img1.picmix.com/output/stamp/normal/0/9/0/4/1604090_a14a5.gif'} alt='wait for your pokemons'/>
    :  <CardContainer
          setPagination={setPagination}
          pages={pages}
          catchPokemon={catchPokemon}
          pagination={pagination}
  />
  }

      </div>
  )
}

export default Home