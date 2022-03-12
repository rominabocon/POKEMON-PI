import Pagination from '../Pagination/Pagination'
import Card from './Card'
import style from './Card.module.css'

function CardContainer({ pagination, setPagination, pages, catchPokemon}) {

    // paginacion
    const lastPokemonCard = pagination * pages
    const firstPokemonCard = lastPokemonCard - pages
    const currentPokemonCard = catchPokemon.slice(firstPokemonCard, lastPokemonCard)
    const pokePagination = (pageNumber) => {
        setPagination(pageNumber)
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