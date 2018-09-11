import React from 'react'

import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import { connect } from 'react-redux'
import { setActiveLanguage} from 'react-localize-redux'

const ITEM_HEIGHT = 48;

@connect((store, ownProps) => {
    return {
      languages: store.locale.languages
    };
})
class LanguageMenu extends React.Component { 
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = lg => {
    this.props.dispatch(setActiveLanguage(lg));
    this.setState({ anchorEl: null });
  };


  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          Lg
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
          }}
        >
          { this.props.languages.map(language => 
            <MenuItem
              key={language.code}
              onClick={ () => this.handleClose(language.code) } 
             > {language.code}
            </MenuItem>
            )
          }
        </Menu>
      </div>
    )
  }
}

export default LanguageMenu;
