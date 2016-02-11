import React from 'react';

const TaskKanban = React.createClass({
  render() {
    return (
      <div>
        <div>{this.props.title}</div>
        <div>{this.props.assign}</div>
        <div>{this.props.description}</div>
      </div>
    );
  }
});

export default TaskKanban;
