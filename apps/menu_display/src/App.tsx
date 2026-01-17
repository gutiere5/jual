import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <div>Store Logo</div>
      <Outlet />
    </div>
  );
}

export default App;
