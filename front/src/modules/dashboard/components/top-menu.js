import React from 'react'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import { connect } from 'react-redux'
import appHistory from '../../../utils/app-history'
import { setActiveLanguage} from 'react-localize-redux'

@connect((store, ownProps) => {
    return {
      languages: store.locale.languages
    };
})
class TopMenu extends React.Component { 
  render() {
    return (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text="Намет"  onClick={ () => appHistory.push('/') } />
          <FontIcon className="muidocs-icon-custom-sort" />
          <ToolbarSeparator />
        </ToolbarGroup>
        <ToolbarGroup>
          <IconMenu
            iconButtonElement={
              <IconButton touch={true}>
                <NavigationExpandMoreIcon />
              </IconButton>
            }>
            { this.props.languages.map(language => 
              <MenuItem primaryText={language.code}
                key={language.code}
                onClick={ () => this.props.dispatch(setActiveLanguage(language.code)) } />
              )
            }
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

export default TopMenu;
