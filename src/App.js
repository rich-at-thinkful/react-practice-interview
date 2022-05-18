import './App.css';
import { useEffect, useState } from "react";
import TodosList from './TodosList';

function App() {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    (async function fetchUsers() {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setUsers(data);
    }());
  }, []);

  return (
    <div className="App">
      <section>
        <h3>Users</h3>
        <ul>
          {users.map(user =>
            <li key={user.id}>
              <p>{user.username}</p>
              <button type="button" onClick={() => setCurrentUserId(user.id)}>Show Todos</button>
            </li>
          )}
        </ul>
      </section>

      {currentUserId && <TodosList userId={currentUserId} />}
    </div>
  );
}

export default App;
