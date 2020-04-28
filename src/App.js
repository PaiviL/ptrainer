import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" >
            Personal Trainer
          </Typography>
        </Toolbar>
      </AppBar>

      <Router>
        <div>
        <h3>
        <Link to="/">Home</Link>{' '}
        <Link to="/customerlist">Customerlist</Link>{' '}
        <Link to="/traininglist">Traininglist</Link>{' '}
        </h3>
        <Switch>
          <Route exact path="/" render={() => <h1>Welcome to PTrainer</h1>} />
          <Route path="/customerlist" component={Customerlist} />
          <Route path="/traininglist" component={Traininglist} />
          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
        </div>
      </Router>
      
    </div>
  );
}

export default App;
//<Customerlist />
//<Traininglist />