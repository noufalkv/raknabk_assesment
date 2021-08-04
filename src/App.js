import React from 'react'
import './App.css';
import PersonalInfo from './pages/PersonalInfo';
import OfficeInfo from './pages/OfficeInfo';
import Confirmation from './pages/Confirmation';
import Success from './pages/Success';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="grid-container">

        <header className="row">
          <div>
            <Link className="pr_name" to="/">Project Name</Link>
            
          </div>
          
        </header>
        <main>

          <div className="row center">
            <Switch>
              <Route exact path="/" component={PersonalInfo} />
              <Route exact path="/officeInfo" component={OfficeInfo} />
              <Route exact path="/confirmation" component={Confirmation} />
              <Route exact path="/success" component={Success} />
            </Switch>
          </div>

        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </Router>
  );
}
export default App;