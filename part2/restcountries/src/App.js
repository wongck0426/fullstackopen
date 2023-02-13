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
      {/* <h2>Length of filtered countries is {filteredCountries.length}</h2> */}
      <ShowResult filteredCountries={filteredCountries} setSearchFilter={setSearchFilter} />
      {/* {countries.map((country) => (
        <h2>{ country.name}</h2>
      ))} */}
    </div>
  )
}

export default App
