import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { catchPokemonByName } from '../../actions'
import style from './SearchingPokemon.module.css'

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
    <div className={style.navDistribution}> 
        <div>
            <Link to='/createPokemon' className={style.searchingpokeB}>Create your Own Pokemon</Link>
        </div>
        <div className={style.searchWarning}>
            <input className={style.searchInput} type="text" value={name} onChange={(e) => handleChange(e)} placeholder='🔎Search your pokemon'></input>
            {!name 
            ? <p className={style.warning}> put a valid pokemon to search</p> 
            : <button className={style.searchingpokeB} disabled={!name} type="submit" onClick={(e) => handleSubmit(e)}>Search</button>}

        </div>
    </div>
)
}

export default SearchPokemon