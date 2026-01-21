import { Link, Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Link to="/">Store Logo</Link>
      <Outlet />
    </div>
  );
}

export default App;
