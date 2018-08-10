import React from 'react'
import { connect } from "react-redux"
import * as UserActions from '../../actions/user-actions'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

@connect((store, ownProps) => {
  return {
  };
})
class GenreContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: [],
    }
  }

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  setSelected = () => {
    this.props.setCheckInput(this.state.checked);
    this.props.handleCloseGenre();
  }

  render() {
    const { fullScreen } = this.props;

    return (
      <div>
        <Dialog
          open={this.props.open}
          scroll={'paper'}
          onClose={this.handleCloseGenre}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">Genre select</DialogTitle>
          <DialogContent>
            <List>
              {['poems', 'blabla', 'roman', 'blabala2', 'poems89', 'blabla34', 'roman54', 'blabala21'].map(value => (
                <ListItem
                  key={value}
                  role={undefined}
                  dense
                  button
                  onClick={this.handleToggle(value)}
                >
                  <Checkbox
                    checked={this.state.checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                  />
                  <ListItemText primary={value} />
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleCloseGenre} color="primary">
              Cancel
            </Button>
            <Button onClick={this.setSelected} color="primary" autoFocus>
              Set
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withMobileDialog()(GenreContainer);