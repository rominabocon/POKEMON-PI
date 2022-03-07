import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createPokemon, getAllTypes } from '../../actions';

function CreatePokemon() {
    const dispatch = useDispatch();
    const getPokeTypes = useSelector((state) => state.types)
   
    useEffect(() => {
        dispatch(getAllTypes())
    },[dispatch])
    
    const [ input, setInput ] = useState({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        isInDataBase: true,
        types: [],
        img:''
    });

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value.toLowerCase()
        });
    };

    function handleSubmit(e){
        e.preventDefault()
        alert('You did it! ')
        dispatch(createPokemon(input)) 
        setInput({
            name: '',
            hp: '',
            attack: '',
            defense: '',
            speed: '',
            height: '',
            weight: '',
            isInDataBase: true,
            types: [],
            img:''
        })
    }
    const handleSelect = (e) => {
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        });
    };
    
    console.log(input)

  return (
    <div>

        <Link to='/pokemons'>Go Back</Link>

        <form onSubmit={e => handleSubmit(e)}>
        
            <label>Name: </label>
                <input
                    type='text'
                    value={input.name}
                    name="name"
                    placeholder='Set Name'
                    onChange={e => handleChange(e)}
                    required={true}
                    autoComplete="off"
                    />
            <label>HP</label>
                <input
                    type='number'
                    value={input.hp}
                    name="hp"
                    placeholder='Set hit points'
                    onChange={e => handleChange(e)}
                    required={true}
                />
            <label>Attack</label>
                <input
                    type='number'
                    value={input.attack}
                    name="attack"
                    placeholder='Set attack'
                    onChange={e => handleChange(e)}
                    required={true}
                />
            <label>Defense</label>
                <input
                    type='number'
                    value={input.defense}
                    name="defense"
                    placeholder='Set defense'
                    onChange={e => handleChange(e)}
                    required={true}
                />
            <label>Speed</label>
                <input
                    type='number'
                    value={input.speed}
                    name="speed"
                    placeholder='Set speed'
                    onChange={e => handleChange(e)}
                    required={true}
                    />
            <label>Height</label>
                <input
                    type='number'
                    value={input.height}
                    name="height"
                    placeholder='Set height'
                    onChange={e => handleChange(e)}
                    required={true}
                />
            <label>Weight</label>
                <input
                    type='number'
                    value={input.weight}
                    name="weight"
                    placeholder='Set weight'
                    onChange={e => handleChange(e)}
                    required={true}
                />

        {/* <select  onChange={e => handleSelect(e)}>
        <option value='all'>Pokemon Types</option> */}
        {getPokeTypes?.map((t) => {
            return (
                <>
                <input onChange={(e) => handleSelect(e)} type="checkbox" value={t.name} />
                <label>{t.name}</label>
                </>
            )})
        }
        {/* </select> */}
        <div>
         <button type="submit">Create your own pokemon</button>
          </div>
        </form>
    </div>
  )
}

export default CreatePokemon