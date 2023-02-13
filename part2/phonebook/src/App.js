import { useEffect, useState } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import personService from "./services/persons"
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchFilter, setSearchFilter] = useState("")
  const [newName, setNewName] = useState("")
  const [newPhone, setNewPhone] = useState("")
  const [style, setStyle] = useState("")
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then((initialPerson) => {
        setPersons(initialPerson)
      })
      .catch((err) => {
        timedMsg("failed to fetch data from api", "error")
      })
  }, [])

  const timedMsg = (message, style) => {
    setNotification(message)
    setStyle(style)

    setTimeout(() => {
      setNotification(null)
      setStyle("")
    }, 5000)
  }

  const handleDelete = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then((res) => {
          setPersons(persons.filter((person) => person.id != id))
          timedMsg(`${name} has now been removed from server`, "success")
        })
        .catch((err) => {
          timedMsg(`${name} has already been removed from server`, "error")
        })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.find((p) => p.name.toLowerCase() === newName.toLowerCase())) {
      if (
        window.confirm(
          `${newName}is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const outdatedPerson = persons.find(
          (p) => p.name.toLowerCase() === newName.toLowerCase()
        )
        const updatedPerson = { ...outdatedPerson, number: newPhone }
        personService
          .update(updatedPerson.id, updatedPerson)
          .then((returnPerson) => {
            timedMsg(`Updated ${returnPerson.name}'s information`, "success")
            setPersons(
              persons.map((p) => (p.id !== updatedPerson.id ? p : returnPerson))
            )
          })
          .catch((err) => {
            timedMsg(
              `Data of ${updatedPerson.name} has been removed from server`,
              "error"
            )
          })
      }
    } else {
      const selectedPerson = {
        name: newName,
        number: newPhone,
        id: persons[persons.length - 1].id + 1,
      }
      personService.create(selectedPerson).then((returnPerson) => {
        setPersons(persons.concat(returnPerson))
        timedMsg(`Added ${returnPerson.name}`, "success")
      })
    }
    setNewName("")
    setNewPhone("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} style={style} />
      <Filter searchFilter={searchFilter} setSearchFilter={setSearchFilter} />
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newPhone={newPhone}
        setNewPhone={setNewPhone}
        handleSubmit={handleSubmit}
      />
      <Persons
        persons={persons}
        filter={searchFilter}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App
