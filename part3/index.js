const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const app = express()


app.use(express.json())
app.use(cors())
morgan.token('post-object', (req, res)=>{
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-object'))


let data = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
]

app.get('/api/persons', (request, response) =>{
    response.json(data)
})

app.get('/api/persons/:id', (request, response) =>{
  const id = Number(request.params.id)
  const person = data.find((person) => person.id === id)
  if(person){
    response.json(person)
  }else{
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) =>{
  const id = Number(request.params.id)
  data = data.filter(person => person.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) =>{
  const body = request.body
  if(!body.name || data.some(person => person.name === body.name)){
        return response.status(400).json({
          error: 'name must be unique'
        })
  }
  if(!body.number || !body.name){
    return response.status(400).json({
      error: 'name must be unique'
    })
  } 
  const person ={
    "id": Math.floor(Math.random()*100000),
    "name": body.name,
    "number": body.number,
  }
  data = data.concat(person)
  response.json(person)
})


app.get('/info', (request, response)=>{
    const numbOfPeople = data.length;
    response.send(`<div>Phonebook has info for ${numbOfPeople} people<div/><div>${new Date()}<div/>`)
})



const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
