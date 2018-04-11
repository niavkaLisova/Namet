import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { connect } from 'react-redux'
import appHistory from '../../../utils/app-history'
import { bindActionCreators } from 'redux'
import { setActiveLanguage, Translate, getTranslate, getLanguages } from 'react-localize-redux';

const TopMenu = ({ translate, languages, setActiveLanguage }) => (
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
        { languages.map(language => 
          <MenuItem primaryText={language.code} key={language.code} onClick={ () => setActiveLanguage(language.code) } />
        )}
      </IconMenu>
    </ToolbarGroup>
  </Toolbar>
);

function mapDispatchToProps(dispatch) {
  return {
    setActiveLanguage: bindActionCreators(setActiveLanguage, dispatch)
  };
}

function mapStateToProps(state) {
  return { 
    translate: getTranslate(state.locale),
    languages: getLanguages(state.locale)
  };
}

export default connect(
    mapStateToProps
    , mapDispatchToProps)(TopMenu)