import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import TodosList from './TodosList';
import todosFixtures from "./todos-fixtures";

afterEach(() => {
  jest.clearAllMocks();
});

test('renders without error', () => {
  render(<TodosList />);
});

test('renders incomplete todos', async () => {
  jest.spyOn(window, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(todosFixtures.slice(0, 5)),
    }),
  );

  const { container } = render(<TodosList userId={2} />);

  await waitFor(async () => {
    const todos = container.querySelectorAll("li");
    expect(todos).toHaveLength(3);
  });
});

test('renders all todos when toggle clicked', async () => {
  jest.spyOn(window, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(todosFixtures.slice(0, 5)),
    }),
  );

  const { container } = render(<TodosList userId={2} />);

  await waitFor(async () => {
    const btn = screen.getByText(/Toggle filter/i);
    let todos = container.querySelectorAll("li");
    expect(todos).toHaveLength(3);
    let filterLabel = screen.getByText(/Showing incomplete todos/i);
    expect(filterLabel).toBeInTheDocument();
    fireEvent.click(btn);
    todos = container.querySelectorAll("li");
    expect(todos).toHaveLength(5);
    filterLabel = screen.getByText(/Showing all todos/i);
    expect(filterLabel).toBeInTheDocument();
  });
});
