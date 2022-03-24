import Pagination from '../Pagination/Pagination'
import Card from './Card'
import { useDispatch } from "react-redux";
import style from './Card.module.css'
import { catchAllPokemon, deletePokemon } from '../../actions';

function CardContainer({ pagination, setPagination, pages, catchPokemon, remove}) {
  const dispatch = useDispatch()
    // paginacion
    const lastPokemonCard = pagination * pages
    const firstPokemonCard = lastPokemonCard - pages
    const currentPokemonCard = catchPokemon.slice(firstPokemonCard, lastPokemonCard)
    const pokePagination = (pageNumber) => {
        setPagination(pageNumber)
      }

      const removeFunction = e => {
        dispatch(deletePokemon({
            id: e.target.value
        }));
        dispatch(catchAllPokemon());
  
    }
  
  return (
      <div>
        <Pagination 
            pages={pages}
            catchPokemon={catchPokemon.length}
            pokePagination={pokePagination}
      />
    <div className={style.cardContainer}>

      {
        currentPokemonCard?.map((p)=>{
          return(
            
            <Card 
            key={p.id} 
            img={p.img}
            name={p.name} 
            id={p.id}
            types={p.types}
            remove={remove}
            removeFunction={removeFunction}
            />
            
            )
        }
        )
      }
      </div>
      </div>
  )
}

export default CardContainer