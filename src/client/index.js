import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import Styles from './index.scss';

class App extends Component {
  componentDidMount() {
    console.log('aftetasdfrsdf t');
  }

  render() {
    return (
      <div>
        <button className="prettier-class" id="prettier-id" type="submit">
          Click Here
        </button>
        <h1>asdfsdfffa</h1>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('app'));

// does it need?
if (module.hot) {
  module.hot.accept();
}
