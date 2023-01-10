

const object1 = {
    name: 'Arto Hellas',
    age: 35,
    education: 'PhD',
  }
  
  const object2 = {
    name: 'Full Stack web application development',
    level: 'intermediate studies',
    size: 5,
  }
  
  const object3 = {
    name: {
      first: 'Dan',
      last: 'Abramov',
    },
    grades: [2, 3, 5, 3],
    department: 'Stanford University',
  }
object1['secret number'] = 1234

const sum = (p1, p2) =>{
    console.log(p1)
    console.log(p2)
    return p1+p2
}
console.log(sum(1, 5))

const squre = p => p*p;

const t = [1, 2, 3, 4]
const tSquared = t.map(p => squre(p))
console.log(tSquared)

const arto = {
    name: 'Arto Hellas',
    greet: function() {
      console.log('hello, my name is ' + this.name)
    },
  }
  
//   setTimeout(arto.greet, 1000) this won't work, the solution is to use bind
setTimeout(arto.greet.bind(arto), 1000)

