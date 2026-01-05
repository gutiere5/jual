import Header from './routes/Header';
import SidePanel from './routes/SidePanel';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="app-layout">
      <Header />
      <SidePanel />
      <Outlet />
      <footer>footer</footer>
    </div>
  );
}

export default App;
