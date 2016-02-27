import React from 'react';
import $ from "jquery";

import StoryKanban from "./StoryKanban";
import Api from "../../api";

const api = new Api()

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: []
    };
  }

  componentWillMount() {
    $.ajax({
        method: 'GET',
        url: '/api/story',
        cache: false,
        success: (data) => {
          if (data.result === 'ok') {
            this.setState({stories: data.message})
          } else {
            this.props.onError(data.message)
          }
        },
        error: (xhr, message, err) => {
          this.props.onError(err)
        }
      })
  }

  componentDidMount() {
  }
  
  handleError(err) {
    console.error(err)
  }

  render() {
    var stories;
    if (this.state.stories) {
      stories = this.state.stories.map( (story, i) => {
        return (
          <StoryKanban
              key={i}
              onError={this.handleError.bind(this)}
              title={story.title}
              id={story.id} />
        );
      });
    }

    return (
      <div>
        {stories}
      </div>
    );
  }
}
