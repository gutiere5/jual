import { NavLink } from "react-router-dom";

function Display() {
  return (
    <>
      <h1>This will be the Main Display Menu</h1>
      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/meat1" end>
          Meat Display 1
        </NavLink>
        <NavLink to="/meat2" end>
          Meat Display 2
        </NavLink>
        <NavLink to="/restaurant" end>
          Restaurant Display
        </NavLink>
        <NavLink to="/produce" end>
          Produce Display
        </NavLink>
      </nav>
    </>
  );
}

export default Display;
