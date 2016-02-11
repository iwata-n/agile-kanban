import React from 'react';
import ReactDOM from 'react-dom';

const Master = React.createClass({
  render() {
    return (
      <div>
        <div>master</div>
        {this.props.children}
      </div>
    );
  }
});

export default Master;