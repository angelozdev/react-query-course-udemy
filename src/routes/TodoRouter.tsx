import { Route, Routes } from "react-router-dom";
import { TodoList } from "pages";

function TodoRouter() {
  return (
    <Routes>
      <Route path="todos">
        <Route path="" element={<TodoList />} />
      </Route>
    </Routes>
  );
}

export default TodoRouter;
