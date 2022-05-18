import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import App from './App';
import todosFixtures from "./todos-fixtures";
import usersFixtures from "./users-fixtures";

afterEach(() => {
  jest.clearAllMocks();
});

test('renders without error', () => {
  render(<App />);
});

test('renders list of users', async () => {
  jest.spyOn(window, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(usersFixtures.slice(0, 5)),
    }),
  );

  const { container } = render(<App />);

  await waitFor(async () => {
    const users = container.querySelectorAll("li");
    expect(users).toHaveLength(5);
    const user = screen.getByText(/Bret/);
    expect(user).toBeInTheDocument();
  });
});

test('renders list of todos when user clicked', async () => {
  jest.spyOn(window, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(usersFixtures.slice(0, 5)),
    }),
  );

  const { container } = render(<App />);

  await waitFor(async () => {
    const users = container.querySelectorAll("li");
    expect(users).toHaveLength(5);
    jest.clearAllMocks();
  });

  jest.spyOn(window, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(todosFixtures.slice(0, 5)),
    }),
  );

  const btns = screen.getAllByText(/Show Todos/);
  fireEvent.click(btns[1]);

  await waitFor(async () => {
    const headers = container.querySelectorAll("h3");
    const todosHeader = Array.from(headers).find(h => h.textContent.match(/Todos/));
    expect(todosHeader).toBeInTheDocument();

    const todos = todosHeader.closest("section").querySelectorAll("li");
    expect(todos[0].textContent).toMatch(/suscipit repellat esse quibusdam voluptatem incidunt/);
  });
});
