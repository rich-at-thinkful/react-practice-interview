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
      <div className="row">
        <div className="col-3 p-3">
          <section>
            <header>
              <h3 className="px-2">Users</h3>
            </header>
            <ul className="list-group">
              {users.map(user =>
                <li className="list-group-item" key={user.id}>
                  <p>{user.username}</p>
                  <button className="btn btn-sm btn-info" type="button" onClick={() => setCurrentUserId(user.id)}>Show Todos</button>
                </li>
              )}
            </ul>
          </section>
        </div>
        <div className="col-9 p-3">
          {currentUserId && <TodosList userId={currentUserId} />}
        </div>
      </div>
    </div>
  );
}

export default App;
