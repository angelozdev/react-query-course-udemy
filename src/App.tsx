import { Wrapper } from "components";
import { Header } from "components/Header";
import { routes } from "components/Header/fixtures";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { PostsRouter, TodoRouter } from "./routes";

function App() {
  return (
    <Fragment>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Wrapper>
              <ul>
                {routes.map(({ name, path }) => (
                  <li key={name}>
                    <Link to={path}>
                      <h3>{name}</h3>
                    </Link>
                  </li>
                ))}
              </ul>
            </Wrapper>
          }
        />
      </Routes>
      <PostsRouter />
      <TodoRouter />
    </Fragment>
  );
}

export default App;
