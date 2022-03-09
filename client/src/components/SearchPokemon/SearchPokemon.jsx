import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { catchPokemonByName } from '../../actions'
import './SearchingPokemon.css'

function SearchPokemon() {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    function handleChange(e) {
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(catchPokemonByName(name.toLowerCase()) )
        setName('')
    }

return (
    <div> 
        <input className='searchInput' type="text" value={name} onChange={(e) => handleChange(e)} placeholder='Search your pokemon'></input>
        <button className='searchingpokeB' type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
    </div>
)
}

export default SearchPokemon