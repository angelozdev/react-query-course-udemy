import { Fragment } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { PostsRouter } from "./routes";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Navigate to="/posts" />} />
      </Routes>
      <PostsRouter />
    </Fragment>
  );
}

export default App;
