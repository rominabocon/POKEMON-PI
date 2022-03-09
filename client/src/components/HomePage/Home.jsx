import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { catchAllPokemon, catchPokemonByOrigin, catchPokemonByType, getAllTypes, sortPokemon, sortPokemonbyAttack } from '../../actions'
import Card from '../Card/Card'
import Pagination from '../Pagination/Pagination'
import SearchPokemon from '../SearchPokemon/SearchPokemon'
import './Home.css'



function Home() {
  const [order, setOrder] = useState("")
  const [pagination, setPagination] = useState(1)
  const [pages] = useState(12)
  const dispatch = useDispatch()
  const catchPokemon = useSelector((state) => state.pokemons)

  const getTypes = useSelector((state) => state.types)
  
  //paginacion
  const lastPokemonCard = pagination * pages
  const firstPokemonCard = lastPokemonCard - pages
  const currentPokemonCard = catchPokemon.slice(firstPokemonCard, lastPokemonCard)


  const pokePagination = (pageNumber) => {
    setPagination(pageNumber)
  }
  
  useEffect(() => {
    dispatch(getAllTypes())
    dispatch(catchAllPokemon())
  }, [dispatch])

function getThemAll (e) {
  e.preventDefault();
  dispatch(catchAllPokemon())
}
function sortingbyName(e){
  e.preventDefault()
  setPagination(1)
  dispatch(sortPokemon(e.target.value))
  setOrder(`Sort ${e.target.value}`)
}

function filterbyType(e){
  dispatch(catchPokemonByType(e.target.value))
  setPagination(1)
  setOrder(`Sort ${e.target.value}`)
}

function sortingbyAttack(e){
  e.preventDefault()
  dispatch(sortPokemonbyAttack(e.target.value))
  setPagination(1)
  setOrder(`Sort ${e.target.value}`)
}

function sortingbyOrigin(e) {
  dispatch(catchPokemonByOrigin(e.target.value))
  setPagination(1)
  setOrder(`Sort ${e.target.value}`)
}

  return (
      <div className='homePage'> 
      <div className='navBar'>
      <Link to='/createPokemon' className='seachingButton'>Create your Own Pokemon</Link>
      <SearchPokemon/>
      </div>
      <div className='selectors'>
      <select onChange={e => sortingbyName(e)}>
                <option value="all">Sort by Name</option>
                <option value="sortAZ">A-Z</option>
                <option value="sortZA">Z-A</option>
      </select>
      <select onChange={e => sortingbyAttack(e)}>
                <option value="all">Sort by Attack</option>
                <option value="sortLower">Lower</option>
                <option value="sortHigher">Higher</option>
      </select>
      <select onChange={e => sortingbyOrigin(e)}>
                <option value="all">Sort by Origin</option>
                <option value="created">Your Creations</option>
                <option value="original">The Originals</option>
      </select>


      <select  onChange={e => filterbyType(e)}>
        <option value='all'>Pokemon Types</option>
          {getTypes?.map((t) => {
              return (
                    <option key={t.name} value={t.name}>{t.name}</option>
              )})
          }
      </select>

      <button onClick={getThemAll}>Catch All Pokemon!</button>
      </div>     
      <Pagination 
        pages={pages}
        catchPokemon={catchPokemon.length}
        pokePagination={pokePagination}
      />
      <div className='cardContainer'>
      {
        currentPokemonCard?.map((p)=>{
          return(
            
            <Card 
            key={p.id} 
            img={p.img}
            name={p.name} 
            id={p.id}
            types={p.types}
            />
            
            )
        }
        )
      }
      </div>
      </div>
  )
}

export default Home