import React,  { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { catchAllPokemon, catchPokemonByOrigin, catchPokemonByType, getAllTypes, sortPokemon, sortPokemonbyAttack } from '../../actions'

function Filters() {
    const [order, setOrder] = useState("")
    const [pagination, setPagination] = useState(1)
    const getTypes = useSelector((state) => state.types)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllTypes())
        dispatch(catchAllPokemon())
      }, [dispatch])
    
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
    <>
    <select onChange={e => sortingbyName(e)}>
          <option value="all">Sort by Name</option>
          <option value="sortAZ">A-Z</option>
          <option value="sortZA">Z-A</option>
      </select><select onChange={e => sortingbyAttack(e)}>
              <option value="all">Sort by Attack</option>
              <option value="sortLower">Lower</option>
              <option value="sortHigher">Higher</option>
          </select><select onChange={e => sortingbyOrigin(e)}>
              <option value="all">Sort by Origin</option>
              <option value="created">Your Creations</option>
              <option value="original">The Originals</option>
          </select><select onChange={e => filterbyType(e)}>
              <option value='all'>Pokemon Types</option>
              {getTypes?.map((t) => {
                  return (
                      <option key={t.name} value={t.name}>{t.name}</option>
                  )
              })}
          </select>
          </>)
}

export default Filters