import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createPokemon, getAllTypes } from '../../actions';
import './CreatePokemon.css'


function CreatePokemon() {
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch();
    const getPokeTypes = useSelector((state) => state.types)
    const pokeState = useSelector((state) => state.pokemons)

    const validation = (input) => {
        
        let errors = {};
        
        if (!input.name) {
            errors.name = "This field is mandatory";
        }
        if(input.name.includes(typeof 'number')){
            errors.name = 'This pokemons alredy exist';
        }
        if (input.hp < 1) {
            errors.hp = 'Your pokemons hp must be higher than 1'
        }
        if (input.attack < 1) {
            errors.attack = 'too weak!'
        }
        if (input.defense < 1 ) {
            errors.defense = 'Your pokemon need more defense. Make him stronger!'
        }
        if (input.speed < 1) {
            errors.speed = 'More speed please. Must be higher than 1'
        }
    
        if (input.weight < 1 ) {
            errors.weight = 'Too skinny. Needs more weight than 1'
        }
        
        if (input.height < 1) {
            errors.height = 'Too short, must be higher than 1'
        }
    
        return errors
    };



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
        img:'https://cdn.pixabay.com/photo/2019/11/18/15/46/pokemon-4635112_640.png'
    });

    useEffect(() => {
        setErrors(validation(input))
    }, [input])

    
    const handleChange = (e) => {
       
        setInput({
            ...input,
            [e.target.name]: e.target.value,
          });
          setErrors(validation({
            ...input,
            [e.target.name]: e.target.value,
          }))
    };

    function handleSubmit(e){
        e.preventDefault()
        if(pokeState.find((p) => p.name === input.name)) {
            alert('Ya existe!');
            setErrors({
                ...input,
                [e.target.name]: "Pokémon duplicated",
            });
        } else{
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
        alert('You Did It!')
}
    }
    const handleSelect = (e) => {
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        });
    };
    const errorscontrol = useMemo(() => {
        if(errors.name || errors.hp || errors.weight || errors.attack || errors.defense || errors.height) return true;
        return false;
      },[errors])

console.log(errors)
    return (
        <div>

        <Link to='/pokemons'>Go Back</Link>

        <form onSubmit={e => handleSubmit(e)}>
            <div>
                <label>Name: </label>
                    <input
                        type='text'
                        value={input.name.toLowerCase()}
                        name="name"
                        placeholder='Set Name'
                        onChange={e => handleChange(e)}
                        required={true}
                        autoComplete="off"
                        />
                    {errors.name && (<p className='error'>{errors.name}</p>)}
            </div>
            <div>
            <label>HP</label>
                <input
                    type='number'
                    value={input.hp}
                    name="hp"
                    placeholder='Set hit points'
                    onChange={e => handleChange(e)}
                    required={true}
                />
            {errors.hp && (<p className='error'>{errors.hp}</p>)}
            </div>
            <div>
            <label>Attack</label>
                <input
                    type='number'
                    value={input.attack}
                    name="attack"
                    placeholder='Set attack'
                    onChange={e => handleChange(e)}
                    required={true}
                />
            {errors.attack && (<p className='error'>{errors.attack}</p>)}
            </div>
            <div>
            <label>Defense</label>
           
                <input
                    type='number'
                    value={input.defense}
                    name="defense"
                    placeholder='Set defense'
                    onChange={e => handleChange(e)}
                    required={true}
                />
                {errors.defense && (<p className='error'>{errors.defense}</p>)}
            </div>
            <div>
            <label>Speed</label>
                <input
                    type='number'
                    value={input.speed}
                    name="speed"
                    placeholder='Set speed'
                    onChange={e => handleChange(e)}
                    required={true}
                    />
                {errors.speed && (<p className='error'>{errors.speed}</p>)}
            </div>
            <div>
            <label>Height</label>
            
                <input
                    type='number'
                    value={input.height}
                    name="height"
                    placeholder='Set height'
                    onChange={e => handleChange(e)}
                    required={true}
                />
                {errors.height && (<p className='error'>{errors.height}</p>)}
            </div>
            <div>
            <label>Weight</label>
            
                <input
                    type='number'
                    value={input.weight}
                    name="weight"
                    placeholder='Set weight'
                    onChange={e => handleChange(e)}
                    required={true}
                />
                {errors.weight && (<p className='error'>{errors.weight}</p>)}
                </div>
        {getPokeTypes?.map((t) => {
            return (
                <>
                <input onChange={(e) => handleSelect(e)} type="checkbox" value={t.name} />
                <label>{t.name}</label>
                </>
            )})
        }

        <div>
        <button type="submit" disabled={errorscontrol}>Create your own pokemon</button>
          </div>
        </form>
    </div>
  )
}

export default CreatePokemon