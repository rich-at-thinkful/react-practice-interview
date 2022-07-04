import './App.css';
import { useEffect, useState } from "react";
import TodosList from './TodosList';

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    (async function fetchUsers() {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setUsers(data);
    }());
  }, []);

  return (
    <div className="App">
      <div className="row container">
        <div className="col-3">
          <section>
            <header className="py-3">
              <h3>Users</h3>
            </header>
            <ul className="list-group">
              {users.map(user =>
                <li className="list-group-item" key={user.id}>
                  <p>{user.username}</p>
                  <button className="btn btn-sm btn-info" type="button" onClick={() => setCurrentUser(user)}>Show Todos</button>
                </li>
              )}
            </ul>
          </section>
        </div>
        <div className="col-9 p-3">
          {currentUser && <TodosList currentUser={currentUser} />}
        </div>
      </div>
    </div>
  );
}

export default App;
