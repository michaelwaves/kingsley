import logo from './kingston_logo.png';
import './App.css';
import Main from './Main';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Main />
        <a
          className="App-link"
          href="https://www.cityofkingston.ca/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Kingston
        </a>
      </header>
    </div>
  );
}

export default App;
