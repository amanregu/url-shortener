import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import List from '../components/urls/List'
import Card from '../components/categories/Card'

const App = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/"  render={() => <List urls={props.urls} categories={props.categories} />} />
        <Route exact path="/categories" render={() => <Card categories={props.categories} />} />
      </Switch>
    </Router>
  )
}

export default App;