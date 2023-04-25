const Persons = ({ persons, filter, handleDelete }) => {
  return (
    <div>
      <h2>numbers</h2>
      {filter === ""
        ? persons.map((person) => (
            <div key={person.id}>
              {person.name} {person.number} <button onClick={()=>handleDelete(person.name, person.id)}>delete</button>
            </div>
          ))
        : persons
            .filter((person) =>
              person.name.toLowerCase().includes(filter.toLowerCase())
            )
            .map((person) => (
              <div key={person.id}>
                {person.name} {person.number}
              </div>
            ))}
    </div>
  )
}
export default Persons
