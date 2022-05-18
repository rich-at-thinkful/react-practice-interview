import { useEffect, useState } from "react";

export default function TodosList({ userId }) {
  const [ showAll, setShowAll ] = useState(false);

  const [ todos, setTodos ] = useState([]);
  useEffect(() => {
    (async function fetchTodos() {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);
      const data = await res.json();
      setTodos(data);
    }());
  }, [userId]);

  const filteredTodos = showAll ? todos : todos.filter(t => !t.completed);

  return (
    <section>
      <h3>Todos</h3>
      <p>{showAll ? "Showing All Todos" : "Showing Incomplete Todos"}</p>
      <button type="button" onClick={() => setShowAll(!showAll)}>Toggle filter</button>
      <ul>
        {filteredTodos.map(todo =>
          <li key={todo.id}>
            <p>
              {todo.title}
            </p>
            <p>status: {todo.completed ? "done" : "not done" }</p>
          </li>
        )}
      </ul>
    </section>
  );
}
