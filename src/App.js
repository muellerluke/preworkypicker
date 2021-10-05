import './App.css';
import NavigationBar from "./components/NavigationBar";
import Home from "./components/Home";
import About from "./components/About";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {Helmet} from "react-helmet";

function App() {
  return (
    <div className="App">
    <Helmet>
      <meta charSet="utf-8" />
      <title>PreworkyPicker: Filter Preworkouts by Ingredients</title>
    </Helmet>
      <Router>
        <NavigationBar></NavigationBar>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/about" component={About}></Route>
      </Router>
    </div>
  );
}

export default App;
