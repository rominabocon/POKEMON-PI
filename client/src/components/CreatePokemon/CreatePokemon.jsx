import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { createPokemon, getAllTypes } from '../../actions';
import style from './CreatePokemon.module.css'


function CreatePokemon() {
    const [errors, setErrors] = useState({})    
    const dispatch = useDispatch();
    const getPokeTypes = useSelector((state) => state.types)
    const pokeState = useSelector((state) => state.pokemons)
    const history = useHistory()



    const validation = (input) => {
        
        let errors = {};

        if (!input.name) {
            errors.name = "This field is mandatory";
        }
        if (input.hp < 1) {
            errors.hp = 'Needs more than 1'
        }
        if (input.attack < 1) {
            errors.attack = 'too weak!'
        }
        if (input.defense < 1 ) {
            errors.defense = 'Make him stronger!'
        }
        if (input.speed < 1) {
            errors.speed = 'More speed please.'
        }
    
        if (input.weight < 1 ) {
            errors.weight = 'Too skinny.'
        }
        
        if (input.height < 1) {
            errors.height = 'Too short'
        }
        if (input.types.length > 2 ) {
            
            errors.types = 'You can not select more than two types'
        }
        if (input.types.length  < 1) {
            errors.types = 'You have to select at least one type'
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
            alert('This Pokemon alredy exist!');
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
        history.push('/pokemons')
}
    }

    function handleSelect (a)  {
        if(!input.types.includes(a.target.value) /*&& input.types.length < 2*/){
            setInput({
            ...input,
            types: [...input.types, a.target.value]
            })
            
        }else {
            setInput({
                ...input,
                types: input.types.filter(e => e !== a.target.value)
            })
        }
            
    }

    const errorscontrol = useMemo(() => {
        if(errors.name || errors.hp || errors.weight || errors.attack || errors.defense || errors.height || errors.types) return true;
        return false;
    },[errors])

    return (
        <div className={style.backG}>

        <Link className={style.buttonBack} to='/pokemons'>Go Back</Link>
        <div className={style.displayForm}>
        <div className={style.detailImg}>
            <img src={'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png'} alt="charmander" />
        </div>

        <form  className={style.controlForm} onSubmit={e => handleSubmit(e)}>
            <div className={style.typeE}>
                <label>Name: </label>
                    <input
                        
                        type='text'
                        value={input.name.toLowerCase()}
                        name="name"
                        placeholder='Set Name'
                        onChange={e => handleChange(e)}
                        required={true}
                        autoComplete="off"
                        className={style.inputSt}
                        />
                    {errors.name && (<p className={style.error}>{errors.name}</p>)}
            </div>
            <div className={style.typeE}>
            <label>HP: </label>
                <input
                    
                    type='number'
                    value={input.hp}
                    name="hp"
                    placeholder='Set hit points'
                    onChange={e => handleChange(e)}
                    required={true}
                    className={style.inputSt}
                />
            {errors.hp && (<p className={style.error}>{errors.hp}</p>)}
            </div>
            <div className={style.typeE}>
            <label>Attack</label>
                <input
                    
                    type='number'
                    value={input.attack}
                    name="attack"
                    placeholder='Set attack'
                    onChange={e => handleChange(e)}
                    required={true}
                    className={style.inputSt}
                />
            {errors.attack && (<p className={style.error}>{errors.attack}</p>)}
            </div>
            <div className={style.typeE}>
            <label>Defense</label>
           
                <input
                    
                    type='number'
                    value={input.defense}
                    name="defense"
                    placeholder='Set defense'
                    onChange={e => handleChange(e)}
                    required={true}
                    className={style.inputSt}
                />
                {errors.defense && (<p className={style.error}>{errors.defense}</p>)}
            </div>
            <div className={style.typeE}>
            <label>Speed</label>
                <input
                    
                    type='number'
                    value={input.speed}
                    name="speed"
                    placeholder='Set speed'
                    onChange={e => handleChange(e)}
                    required={true}
                    className={style.inputSt}
                    />
                {errors.speed && (<p className={style.error}>{errors.speed}</p>)}
            </div>
            <div className={style.typeE}>
            <label>Height</label>
            
                <input
                    
                    type='number'
                    value={input.height}
                    name="height"
                    placeholder='Set height'
                    onChange={e => handleChange(e)}
                    required={true}
                    className={style.inputSt}
                />
                {errors.height && (<p className={style.error}>{errors.height}</p>)}
            </div>
            <div className={style.typeE}>
            <label>Weight</label>
            
                <input
                    type='number'
                    value={input.weight}
                    name="weight"
                    placeholder='Set weight'
                    onChange={e => handleChange(e)}
                    required={true}
                    className={style.inputSt}
                />
                {errors.weight && (<p className={style.error}>{errors.weight}</p>)}
                </div>
                <div className={style.checkBox}>
        {getPokeTypes?.map((t) => {
            return (
                <div key={t.name} className={style.check}>
                <input  onChange={(e) => handleSelect(e)} type="checkbox" value={t.name} />
                <label>{t.name}</label>
                
                </div>
            )})
        }
      
        </div>
        {errors.types && (<p style={{"color": 'red'}}>{errors.types}</p>)}
        <div>
            <button type="submit" disabled={errorscontrol}>Create your own pokemon</button>
        </div>
        </form>
        </div>
    </div>
    )
}

export default CreatePokemon