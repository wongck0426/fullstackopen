const mongoose = require('mongoose')

if (process.argv.length<3){
    console.log('give password as argument')
    process.exit(1)
}
const password = process.argv[2];
const url =
  `mongodb+srv://fullstack:${password}@fullstackopen.flwhl1k.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery',false)
mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
    name: String,
    phone: String
})

const Phonebook = mongoose.model("Phonebook", phonebookSchema)
const person = new Phonebook({
    name: process.argv[3],
    phone: process.argv[4]
})

if(process.argv.length === 3){
    console.log("You try to find all the persons")
    Phonebook.find({}).then( results =>{
        console.log('phonebook:')
        results.forEach(note =>{
            console.log(note.name, note.phone)
        })
        mongoose.connection.close()
    })
}else{
    person.save().then(result =>{
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
    })
}




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