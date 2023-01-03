import './App.css';
import Navbar from './components/Navbar/Navbar.js';
import Main from './components/Main/Main.js';
import Footer from './components/Footer/Footer.js';

function App() {
  return (
    <div className="App">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"></link>
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
