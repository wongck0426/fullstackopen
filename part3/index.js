require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person').default
const app = express()


app.use(express.json())
app.use(cors())
// eslint-disable-next-line no-unused-vars
morgan.token('post-object', (req, res) => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-object'))
app.use(express.static('build'))

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
const errorHandler = (error, request, reponse, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return reponse.state(400).send({ error: 'malformatted id' })
  }
  next(error)
}

// function validatePerson(person){
//   const error = [];
//   if (!person.name){
//     error.push('Name is required')
//   }
//   if(!person.number){

//   }
// }


app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(people => {
    response.json(people)
  }).catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = Number(request.params.id)
  Person.findByIdAndRemove(id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  console.log('INSIDE app.post')
  console.log('And the body is : ', request.body)
  const body = request.body
  if (!body.name) {
    return response.status(400).json({
      error: 'name must be entered'
    })
  }
  if (!body.number) {
    return response.status(400).json({
      error: 'phone number must be entered'
    })
  }
  console.log('pass the validation')

  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person.save().then((savedPerson) => {
    response.json(savedPerson)
  }).catch(error => next(error))
  // data = data.concat(person)
  // response.json(person)
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = new Person({
    name: body.name,
    number: body.number
  })
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedperson => {
      response.json(updatedperson)
    }).catch(error => next(error))

})


app.get('/info', (request, response, next) => {
  Person.find({}).then(people => {
    response.send(`
    <div>Phonebook has info for ${people.length} people<div/>
    <div>${new Date()}<div/>
    `)
  }).catch(error => next(error))
})


app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})