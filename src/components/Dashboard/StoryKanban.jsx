import React from 'react';

import TaskKanban from "./TaskKanban";

const StoryKanban = React.createClass({
  render() {
    const tasks = this.props.tasks.map( (task, i) => {
      return (
        <TaskKanban key={i} title={task.title} assign={task.assign} state={task.state} description={task.description} />
      );
    });
    return (
      <div>
        <div>{this.props.title}</div>
        <div>{this.props.id}</div>
        {tasks}
      </div>
    );
  }
});

export default StoryKanban;
