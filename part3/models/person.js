const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI_PHONEBOOK
console.log('Logging url before connecting', url)

mongoose.connect(url)
  .then(result => console.log('connected to MongoDB', result))
  .catch((error) => {console.log('error connecting to MongoDB:', error)})

const phonebookSchema = new mongoose.Schema({
  name: {
    type:String,
    required:[true, 'name is required'],
    minLength: 3,
  },
  number: {
    type: String,
    required: [true, 'number is required'],
    minLength: 8,
  }
})

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model('Person', phonebookSchema)
// const Phonebook = mongoose.model("Phonebook", phonebookSchema)
// const person = new Phonebook({
//     name: process.argv[3],
//     phone: process.argv[4]
// })

// if(process.argv.length === 3){
//     console.log("You try to find all the persons")
//     Phonebook.find({}).then( results =>{
//         console.log('phonebook:')
//         results.forEach(note =>{
//             console.log(note.name, note.phone)
//         })
//         mongoose.connection.close()
//     })
// }else{
//     person.save().then(result =>{
//         console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
//         mongoose.connection.close()
//     })
// }




// Phonebook.deleteMany(
//     {$or: [{name: null }, {name: ''}, {phone: null}, {phone: ''}]},(err, result)=>{
//        if(err){
//         console.log('Error deleting documents: ', err)
//        } else{
//         console.log('Deleted')
//         mongoose.connection.close()
//        }
//     }
// )