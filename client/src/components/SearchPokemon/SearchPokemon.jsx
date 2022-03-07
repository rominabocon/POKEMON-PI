import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { catchPokemonByName } from '../../actions'

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
        <input type="text" value={name} onChange={(e) => handleChange(e)} placeholder='Search your pokemon'></input>
        <button type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
    </div>
)
}

export default SearchPokemon