import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './components/HomePage/Home';
import LandingPage from './components/LandingPage/LandingPage';
import CardDetailContainer from './components/CardDetail/CardDetailContainer';
import CreatePokemon from './components/CreatePokemon/CreatePokemon';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route path='/' exact component={LandingPage}/>
        <Route path='/pokemons' exact component={Home}/>
        <Route path='/pokemons/:id'  component={CardDetailContainer}/>
        <Route path='/createPokemon' component={CreatePokemon}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;