import { useEffect, useState } from "react"
import Filter from "./components/Filter"
import axios from "axios"
import ShowResult from './components/ShowResult'


const App = () => {
  const [searchFilter, setSearchFilter] = useState("")
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    console.log("effect run, currency is now", countries)
    axios.get("https://restcountries.com/v2/all").then((res) => {
      setCountries(res.data)
    })
  }, [])
  
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchFilter.toLowerCase())
  )



  return (
    <div>
      <Filter searchFilter={searchFilter} setSearchFilter={setSearchFilter} />
      <ShowResult filteredCountries={filteredCountries} setSearchFilter={setSearchFilter} />
    </div>
  )
}

export default App
