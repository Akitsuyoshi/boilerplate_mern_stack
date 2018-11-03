import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import Styles from './index.scss';

class App extends Component {
  componentDidMount() {
    console.log('aftetr componet');
  }

  render() {
    return (
      <div>
        <h1>as</h1>
      </div>
    );
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('app'),
);

// does it need?
module.hot.accept();
