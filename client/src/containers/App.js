import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GestionClasses from './gestion/gestion-classes';
import GestionEleves from './gestion/gestion-eleves';
import GestionDomainesCompetences from './gestion/gestion-domaines-competences';
import Login from '../components/authentication/login';
import Register from '../components/authentication/register';
import Layout from '../hoc/Layout/Layout';
import { hot } from 'react-hot-loader';
import gestionDomainesTreetable from './gestion/gestion-domaines-treetable';
import GestionEvaluation from './gestion/gestion-evaluation';

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Route exact path="/" component={GestionClasses} />
          <Route path="/gestion-classes" component={GestionClasses} />
          <Route path="/gestion-eleves" component={GestionEleves} />
          <Route
            path="/gestion-competences"
            component={gestionDomainesTreetable}
          />
          {/* Remplacer par les bons components. */}
          <Route path="/gestion-evaluations" component={GestionEvaluation} />
          <Route path="/resultats-competences" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Layout>
      </Router>
    );
  }
}

export default hot(module)(App);
