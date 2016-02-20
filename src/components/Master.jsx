import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from 'material-ui/lib/app-bar';
import {Spacing} from 'material-ui/lib/styles';


import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import FlatButton from 'material-ui/lib/flat-button';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import MyTheme from './Theme';

const styles = {
  appbar: {
    margin: 0,
    position: 'fixed'
  },
  content: {
    width: '100%',
    height: '100%',
    paddingTop: 64,
  }
}

const Master = React.createClass({
  childContextTypes : {
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(MyTheme),
    };
  },

  render() {
    return (
      <div style={{width: '100%'}}>
        <AppBar
          style={styles.appbar}
          title="Title"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <div style={styles.content}>
          {this.props.children}
        </div>
      </div>
    );
  }
});

export default Master;