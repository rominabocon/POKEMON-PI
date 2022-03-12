import React from 'react'
import { useDispatch } from 'react-redux'
import { catchPokemonByOrigin, catchPokemonByType, sortPokemon, sortPokemonbyAttack } from '../../actions';
import style from './Filters.module.css'

function Filters({catchAllPokemon, setPagination, setOrder, getTypes }) {
  
const dispatch = useDispatch()

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
    <div className={style.selectors}>
      <div className={style.filters}>
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

      </div>
      <div>
      <button className={style.catchPokemon} onClick={getThemAll}>Catch All Pokemon!</button>
      </div>
      </div>     
  )
}

export default Filters