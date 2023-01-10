import { useState } from "react";

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statline = ({ text, value }) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  );
};
const Stat = (props) => {
  console.log(props);
  const [good, neutral, bad] = props.data;
  if (good === 0 && neutral === 0 && bad === 0) return <p>No feedback given</p>;
  return (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
          <Statline text="good" value={good} />
          <Statline text="neutral" value={neutral} />
          <Statline text="bad" value={bad} />
          <Statline text="all" value={good + neutral + bad} />
          <Statline
            text="average"
            value={Math.floor(good + neutral * 0 + bad * -1)}
          />
          <Statline
            text="positive"
            value={(good / (good + neutral + bad)) * 100 + "%"}
          />
        </tbody>
      </table>
    </>
  );
};
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button text={"good"} handleClick={() => setGood(good + 1)} />
      <Button text={"neutral"} handleClick={() => setNeutral(neutral + 1)} />
      <Button text={"bad"} handleClick={() => setBad(bad + 1)} />
      <Stat data={[good, neutral, bad]} />
    </div>
  );
};

export default App;
