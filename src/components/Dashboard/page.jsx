import React from 'react';

const data_storys = [
  {
    id: 0,
    title: "Story 1",
    tasks: [
      {
        title: "Task 1",
        description: "Description...",
        assign: "Naoki Iwata",
        state: "todo",
      },
      {
        title: "Task 2",
        description: "Description...",
        assign: "Naoki Iwata",
        state: "doing",
      },
      {
        title: "Task 3",
        description: "Description...",
        assign: "Naoki Iwata",
        state: "done",
      }
    ]
  }
];

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

const StroryKanban = React.createClass({
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

const Dashboard = React.createClass({
  getInitialState() {
    return {
      storys: data_storys
    };
  },

  render() {
    const storys = this.state.storys.map( (story, i) => {
      return (
        <StroryKanban title={story.title} tasks={story.tasks} id={story.id} key={i} />
      );
    });

    return (
      <div>
        {storys}
      </div>
    );
  }
});

export default Dashboard;