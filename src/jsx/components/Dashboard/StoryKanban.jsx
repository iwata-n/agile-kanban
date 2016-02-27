import React from 'react';
import $ from "jquery";

import TaskKanban from "./TaskKanban";

import Paper from 'material-ui/lib/paper';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import Badge from 'material-ui/lib/badge';


const styles = {
  root: {
    position: 'relative',
    width: '100%',
    padding: 5,
    margin: 5,
  },
  state: {
    width: '30%',
    display: 'inline-block',
    verticalAlign: 'top',
    padding: 5,
    margin: 5,
  }

};

/**
 * ストーリーごとにカンバンを束ねる為のカンバン
 */
export default class StoryKanban extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: []
    }
  }
  
  componentWillMount() {
    $.ajax({
        method: 'GET',
        url: '/api/story/' + this.props.id,
        cache: false,
        success: (data) => {
          if (data.result === 'ok') {
            this.setState({tasks: data.message})
          } else {
            this.props.onError(data.message)
          }
        },
        error: (xhr, message, err) => {
          this.props.onError(err)
        }
      })
  }
  
  handleDragStart(event) {
    event.dataTransfer.setData("text", event.target.id)
  }
  
  handleDragOver(event) {
    event.preventDefault()
  }
  
  handleDrop(event) {
    var id = event.dataTransfer.getData("text")
    
    var drag_elm =document.getElementById(id);
    //ドロップ先にドラッグされた要素を追加
    event.currentTarget.appendChild(drag_elm);
    event.preventDefault()
  }
  
  taskList(state) {
    const filtered_tasks = this.state.tasks.filter((element) => {
      return (element.state == state)
    })
    const tasks = filtered_tasks.map( (task, i) => {
      return (
        <TaskKanban
            key={i}
            id={task.id}
            title={task.title}
            assign={task.assign}
            state={task.state}
            description={task.description}
            onDragStart={this.handleDragStart.bind(this)}/>
      );
    });
    const title = (state)
    return (
      <Paper style={styles.state}
             className={state}
             onDragOver={this.handleDragOver.bind(this)}
             onDrop={this.handleDrop.bind(this)}>
        {title}
        {tasks}
      </Paper>
    )
  }

  render() {
    return (
      <Paper style={styles.root} zDepth={1}>
        <div>#{this.props.id} {this.props.title}</div>
        {this.taskList('todo')}
        {this.taskList('doing')}
        {this.taskList('done')}
      </Paper>
    );
  }
}
