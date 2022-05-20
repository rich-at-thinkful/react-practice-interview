import { useEffect, useState } from "react";

export default function TodosList({ user = {} }) {
  const [ showAll, setShowAll ] = useState(false);

  const [ todos, setTodos ] = useState([]);
  useEffect(() => {
    (async function fetchTodos() {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/todos`);
      const data = await res.json();
      setTodos(data);
    }());
  }, [user.id]);

  const filteredTodos = showAll ? todos : todos.filter(t => !t.completed);

  return (
    <section>
      <h3>{user.username}'s Todos</h3>
      <section className="my-2">
        <p><em>{showAll ? "Showing All Todos" : "Showing Incomplete Todos"}</em></p>
        <button className="btn btn-primary" type="button" onClick={() => setShowAll(!showAll)}>Toggle filter</button>
      </section>
      <ul className="list-group">
        {filteredTodos.map(todo =>
          <li className="list-group-item" key={todo.id}>
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
