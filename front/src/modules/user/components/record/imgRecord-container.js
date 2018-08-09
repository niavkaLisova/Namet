import React from 'react'
import * as UserActions from '../../actions/user-actions'

import { connect } from "react-redux"
import { ToastStore } from 'react-toasts'
import { API_DOMAIN } from '../../../../utils/config.js'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'

import '../User.sass'

@connect((store, ownProps) => {
  return {
    user: store.user,
    thumbnail: store.user.thumbnail
  };
})
class ImgRecordContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      preload: null
    }
  }

  handleChangeImage = event => {
    const file = event.target.files[0];
    this.setState({
      preload: URL.createObjectURL(file)
    })

    this.props.dispatch(UserActions.setFile(file))
  }

  render() {
    
    return (
      <div>   
        <input
          accept="image/*"
          id="upload-file"
          type="file"
          onChange={this.handleChangeImage}
        />
        {(this.state.preload)? 
          (<img class='preload' src={this.state.preload}/>):
          (
            (this.props.img)? (
            <img class='smallPreload' src={API_DOMAIN + 'public/upload/record/' + this.props.img}/>
            ): ('')
        )}
        </div>
    )
  }
};

export default ImgRecordContainer;
