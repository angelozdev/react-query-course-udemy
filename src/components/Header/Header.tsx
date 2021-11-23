import { Wrapper } from "components";
import { NavLink } from "react-router-dom";
import { routes } from "./fixtures";

function Header() {
  return (
    <header className="header">
      <Wrapper>
        <nav className="nav">
          <ul className="nav-list">
            {routes.map(({ name, path }) => (
              <li className="nav-item" key={name}>
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "")}
                  to={{ pathname: path }}
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </Wrapper>
    </header>
  );
}

export default Header;
