import ContentCotainer from './components/ContentContainer';
import Header from './components/Header';
import SidePanel from './components/SidePanel';

function App() {
  return (
    <div className="app-layout">
      <Header />
      <ContentCotainer />
      <SidePanel />
      {/* <footer>footer</footer> */}
    </div>
  );
}

export default App;
