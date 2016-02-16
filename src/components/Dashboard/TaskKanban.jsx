import React from 'react';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import FlatButton from 'material-ui/lib/flat-button';
import Paper from 'material-ui/lib/paper';

const style = {
  background: '#FFFFCC',
  padding: 5,
  margin: 5,
};

export default class TaskKanban extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <Paper style={style}
               id={this.props.id}
               draggable="true"
               onDragStart={this.props.onDragStart}>
          {this.props.title}
        </Paper>
    );
  }
}
