import React ,{useEffect} from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import store from "./store";
import setAuthToken from './util/setAuthToken';
import { setCurrentUser } from './actions/authAction';

//landing components
import Landing from './components/landing';
import productDetails from './components/landing/productDetails';
import './App.css';
import 'antd/dist/antd.css';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
      <div className="App">
        <Route exact path="/" component={Landing}/>
        <Route exact path="/products/:id" component={productDetails}/>
      </div>
      </Router>
    </Provider>
  );
}

export default App;
