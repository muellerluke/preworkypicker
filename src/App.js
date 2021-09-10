import './App.css';
import NavigationBar from "./components/NavigationBar";
import Home from "./components/Home";
import About from "./components/About";
import { BrowserRouter as Router, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar></NavigationBar>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/about" component={About}></Route>
      </Router>
    </div>
  );
}

export default App;
