import React from 'react'

import * as RecordActions from '../../actions/record-actions'
import * as UserActions from '../../actions/user-actions'
import ImgRecordContainer from '../record/imgRecord-container'
import CollectionModal from './collectionModal'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Select from '@material-ui/core/Select'
import NativeSelect from '@material-ui/core/NativeSelect'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import Chip from '@material-ui/core/Chip'

import CollectionContainer from '../record/collection-container'
import GenreModal from '../record/genreModal'
import FormControl from '@material-ui/core/FormControl'
import { Container, Row, Col } from 'react-grid-system'
import { connect } from "react-redux"
import { ToastStore } from 'react-toasts'
import { API_DOMAIN } from '../../../../utils/config.js'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
});


@connect((store, ownProps) => {
  return {
    collName: store.recordEdit.collName
  };
})
class RightSidebarContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    }
  }

  handleClickOpenGenre = () => {
    this.setState({ open: true });
  };

  handleCloseGenre = () => {
    this.setState({ open: false });
  };

  setCheckInput = checked => {
    let checkList = '';

    checked.map(item => {
      if (checkList.length > 0) {
        checkList = checkList + ', '+ item;
      } else {
        checkList = item;
      }
    })

    this.props.handleChangeRecordGenre(checkList)
  }

  render() {
    const { record } = this.props;
    const { classes, theme } = this.props;

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };
    
    return (
      <div class='recordbar'>
        <FormControl>
          <TextField
            label="Describe"
            multiline
            rowsMax="4"
            onChange={this.props.handleChangeRecord}
            name="describe"
            value={this.props.record.describe}
          />
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-multiple-chip">Chip</InputLabel>
          <Select
            multiple
            name='type'
            value={record.type}
            onChange={this.props.handleChangeRecord}
            input={<Input id="select-multiple-chip" />}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(value =>  <Chip key={value} label={value} className={classes.chip} /> )}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {['wall', 'work'].map(name => (
              <MenuItem
                key={name}
                value={name}
                style={{
                  fontWeight:
                    record.type.indexOf(name) === -1
                      ? theme.typography.fontWeightRegular
                      : theme.typography.fontWeightMedium,
                }}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
          <span class='error'>{this.props.typeError}</span>
        </FormControl>

        <FormControl>
          <InputLabel htmlFor='select-type'>State</InputLabel>
          <Select
            native
            value={record.state}
            onChange={this.props.handleChangeRecord}
            inputProps={{
              name: 'state',
              id: 'select-state',
            }}
          >
            <option value={'draft'}>draft</option>
            <option value={'public'}>public</option>
          </Select>
        </FormControl>

        <FormControl>
          <TextField
            label="Language"
            onChange={this.props.handleChangeRecord}
            name="language"
            value={record.language}
          />
        </FormControl>

        <FormControl>
          <TextField
            label="Genre"
            onChange={this.props.handleChangeRecord}
            name="genre"
            value={record.genre}
          />
          <Button onClick={this.handleClickOpenGenre}>Open list</Button>
          <GenreModal
            open={this.state.open}
            handleCloseGenre={this.handleCloseGenre}
            setCheckInput={this.setCheckInput}
          />
        </FormControl>

        <ImgRecordContainer img={this.props.record.img} />

        <div>
          <CollectionModal title={this.props.collName.title} />
        </div>

        <FormControl>
          <TextField
            label="Gift"
            onChange={this.props.handlelistGift}
            name="gift"
            value={record.gift}
          />
          
          {(record.gift.length > 0)? (
          this.props.list.map(item => {
            return <MenuItem key={item._id} button onClick={() => this.props.handleUserGift(item)}>
              <ListItemText>{item.nickname}({item.name})</ListItemText>
            </MenuItem>
          })
          ): ''}
        </FormControl>

      </div>
    )
  }
};

export default withStyles(styles, { withTheme: true })(RightSidebarContainer);
