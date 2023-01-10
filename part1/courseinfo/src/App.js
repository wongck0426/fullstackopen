// const Header = (props) =>(
//   <h1>{props.course.name}</h1>
// )
// const Content = (props) =>(
//   <div>
//     <Part course={props.course.parts[0]} />
//     <Part course={props.course.parts[1]} />
//     <Part course={props.course.parts[2]} />
//   </div>
// )
// const Total = (props) =>(
//   <p>Number of exercises {props.course.parts.reduce((a, b)=> a + b.exercises, 0)}</p>
// )

// const Part = (props) =>(
//   <p>
//     {console.log(props)}
//     {props.course.name} {props.course.exercises}
//   </p>
// )

// const App = () => {
//   const course = {
//     name: 'Half Stack application development',
//     parts: [
//       {
//         name: 'Fundamentals of React',
//         exercises: 10
//       },
//       {
//         name: 'Using props to pass data',
//         exercises: 7
//       },
//       {
//         name: 'State of a component',
//         exercises: 14
//       }
//     ]
//   }
//   return (
//     <div>
//       <Header course={course} />
//       <Content course={course} />
//       <Total course={course}/>
//     </div>
//   )
// }

// export default App

import { useState } from "react";

// const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
// const Display = ({ counter }) => <div>{counter}</div>;

// const App = () => {
//   const [counter, setCounter] = useState(0);
//   const increaseByOne = () => setCounter(counter + 1);
//   const decreaseByOne = () => setCounter(counter - 1);
//   const setToZero = () => setCounter(0);

//   return (
//     <div>
//       <Display counter={counter} />
//       <Button onClick={increaseByOne} text="plus" />
//       <Button onClick={setToZero} text="zero" />
//       <Button onClick={decreaseByOne} text="minus" />
//     </div>
//   );
// };

const History = (props) => {
  if (props.allClicks.length === 0) {
    return <div>the app is used by pressing the buttons</div>;
  }
  return <div>button press history: {props.allClicks.join(" ")}</div>;
};

// const Button = ({ handleClick, text }) => (
//   <button onClick={handleClick}>{text}</button>
// );
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}> {text} </button>
);

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);

  const handleLeftClick = () => {
    setAll(allClicks.concat("L"));
    setLeft(left + 1);
  };
  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    setRight(right + 1);
  };

  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text='left' />
      <Button handleClick={handleRightClick} text='left' />
      {right}
      <History allClicks={allClicks} />
    </div>
  );
};

export default App;
