const Header = (props) =>(
  <h1>{props.course.name}</h1>
)
const Content = (props) =>(
  <div>
    <Part course={props.course.parts[0]} />
    <Part course={props.course.parts[1]} />
    <Part course={props.course.parts[2]} />
  </div>
)
const Total = (props) =>(
  <p>Number of exercises {props.course.parts.reduce((a, b)=> a + b.exercises, 0)}</p>
)

const Part = (props) =>(
  <p>
    {console.log(props)}
    {props.course.name} {props.course.exercises}
  </p>
)

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course}/>
    </div>
  )
}

export default App
