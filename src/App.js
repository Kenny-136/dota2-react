import { useState, useEffect } from 'react';
import './App.css'
import MainPage from './components/MainPage';
import Hero from './components/Hero';
import { Routes, Route, Link } from 'react-router-dom'

function App() {
  const [heroesData, setHeroesData] = useState([])
  const [selectedHero, setSelectedHero] = useState([])

  useEffect(() => {
    fetch(`https://api.opendota.com/api/constants/hero_names`)
      .then(res => res.json())
      .then(data => {
        setHeroesData(data)
      })
  }, [])

  const heroDataGrid = Object.keys(heroesData).map(key => heroesData[key])

  return (
    <main className="App">
      {/* <MainPage heroDataGrid={heroDataGrid} /> */}
      <Link to='/' id="header-title">Dota 2 All Heroes</Link>
      <Link to='/hero' id='hide'>Hero</Link>

      <Routes>
        <Route path='/' element={<MainPage heroDataGrid={heroDataGrid} />}></Route>
        <Route path='/hero/:id' element={<Hero heroDataGrid={heroDataGrid} />}></Route>
      </Routes>
    </main>
  );
}

export default App;