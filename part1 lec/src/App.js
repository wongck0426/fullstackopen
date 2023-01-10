const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} year old</p>
    </div>
  );
};

const App = () => {
  const age = 10
  return (
    <div>
      <h1>Greetings</h1>
      <Hello age = {age }name='Ken'/>
      <Hello age = {26+10} name='Karina'/>
      
    </div>
  )
};

export default App;
