import { Header } from "components/Header";
import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { PostsRouter, TodoRouter } from "./routes";

function App() {
  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<p>Home</p>} />
      </Routes>
      <PostsRouter />
      <TodoRouter />
    </Fragment>
  );
}

export default App;
