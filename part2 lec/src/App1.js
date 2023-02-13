import { useState, useEffect } from "react"
import Note from "./components/Note"
import noteService from "./services/notes"
import Notification from "./components/Notification"

//json-server --port 3001 --watch db.json
const Footer = ()=>{
  const footerStyle = {
    color:'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return(
    <div style={footerStyle}>
      <br/>
      <em>Note app, Created by hand</em>
    </div>
  )
}
const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("a new note...")
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  //no longer need to pass notes from index, since fetching directly from server
  useEffect(() => {
    noteService.getAll().then((initialNote) => {
      setNotes(initialNote)
    })
  }, [])

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
      })
      .catch((error) => {
        setErrorMessage(`Note ${note.content} was already removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter((n) => n.id !== id))
      })
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1,
    }

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote))
      setNewNote("")
    })
  }
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  return (
    <div>
      {console.log(" return body rendered")}
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type='submit'>save</button>
      </form>
      <Footer/>
    </div>
  )
}

export default App
