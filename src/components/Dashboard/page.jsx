import React from 'react';

import StoryKanban from "./StoryKanban";

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

const Page = React.createClass({
  getInitialState() {
    return {
      storys: data_storys
    };
  },

  render() {
    const storys = this.state.storys.map( (story, i) => {
      return (
        <StoryKanban title={story.title} tasks={story.tasks} id={story.id} key={i} />
      );
    });

    return (
      <div>
        {storys}
      </div>
    );
  }
});

export default Page;
