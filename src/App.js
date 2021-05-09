import logo from './logo.svg';
import './App.css';
import DataDisplay from './components/DataDisplay'
import DataControl from './components/DataControl'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>blogscrape</h1>
      </header>
      <body>
        <div>
          <Router>
            <DataControl />
            <DataDisplay />
          </Router>

        </div>
      </body>
    </div>
  );
}

export default App;
