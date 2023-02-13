import ShowWeather from './ShowWeather'


const ShowResult = ({ filteredCountries, setSearchFilter }) => {
    if (filteredCountries.length === 1) {
        const country = filteredCountries[0]
        return (
          <div>
            <h1>{country.name}</h1>
            <div>
              capial: {country.capital} <br />
              area: {country.numericCode}
            </div>
            <h3>Languages: </h3>
            <ul>
              {country.languages.map((language) => (
                <li key={language.name}>{language.name}</li>
              ))}
            </ul>
            <img src={country.flag} alt={country.name} width='10%' />
            <ShowWeather capital={country.capital} />
          </div>
        )
    }
    if(filteredCountries.length >= 10) return <div>Too many matches, specify another filterd </div>

    return filteredCountries.map(country => {
        return <div key={country.name}>
            {country.name} <button value={country.name} onClick={(e)=>setSearchFilter(e.target.value)}>show</button>
        </div>
    })

}
export default ShowResult