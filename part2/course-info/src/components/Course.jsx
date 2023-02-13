import React from "react";

const Header = ({ course }) => <h2>{course.name}</h2>;

const Content = ({ parts }) =>
  parts.map((part) => <Part key={part.key} part={part} />);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Course = ({ course }) => {
  console.log(course);
  const total = course.parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0);

  return (
    <>
      <Header course={course} />
      <Content parts={course.parts} />
      <h4>total of {total} exercises</h4>
    </>
  );
};
export default Course;
