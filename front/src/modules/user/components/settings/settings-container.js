import React from 'react';

import * as UserActions from '../../actions/user-actions'

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { connect } from "react-redux"
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import NativeSelect from '@material-ui/core/NativeSelect'
import TextField from '@material-ui/core/TextField'
import { Container, Row, Col } from 'react-grid-system'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

import PasswordSettingsContainer from './passwordSettings-container'
import EmailSettingsContainer from './emailSettings-container'
import AvatarSettingsContainer from './avatarSettings-container'
import NameSettingsContainer from './nameSettings-container'

import '../User.sass'

@connect((store, ownProps) => {
  return {
    user: store.user
  };
})
export default class SettingsContainer extends React.Component {
  componentDidMount() {
    let interval = setInterval(() => {
      if (this.props.user.email.length > 0) {
        let { formData } = this.state;
        formData.nickname = this.props.user.nickname;
        formData.country = (this.props.user.country)? this.props.user.country: '';
        formData.city = (this.props.user.city)? this.props.user.city: '';
        formData.birthday = this.props.user.birthday;
        formData.gender = (this.props.user.gender)? this.props.user.gender: '';

        this.setState({
          formData,
          currentlyEmail: this.props.user.email,
          avatar: this.props.user.avatar,
          name: this.props.user.name
        })
        clearInterval(interval);
      }
    }, 1500);

    ValidatorForm.addValidationRule('isPasswordProper', (value) => {
      if (value !== this.state.newPassword) {
        return false;
      }
      return true;
    });
  }

  constructor(props) {
    super(props);

    this.state = {
      formData: {
        nickname: '',
        country: '',
        city: '',
        gender: 'none',
        birthday: ''
      },
      currentlyPassword: '',
      confirmPassword: '',
      newPassword: '',
      currentlyEmail: '',
      newEmail: '',
      submitted: false,
      submittedPassword: false,
      submittedEmail: false,
      submittedName: false,
      name: ''
    };

  }

  handleChange = event => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  }

  handleSubmit = () => {
    this.setState({ submitted: true }, () => {
      setTimeout(() => this.setState({ submitted: false }), 5000);
    });
    this.props.dispatch(UserActions.settingsUpdate(this.state.formData))
  }

  handleSubmitPassword = () => {
    this.setState({ submittedPassword: true }, () => {
      setTimeout(() => this.setState({ submittedPassword: false }), 5000);
    });
    this.props.dispatch(UserActions.changePassword(this.state.currentlyPassword, this.state.newPassword));

    this.setState({
      currentlyPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
  }

  handleSubmitEmail = () => {
    this.setState({ submittedEmail: true }, () => {
      setTimeout(() => this.setState({ submittedEmail: false }), 5000);
    });
    this.props.dispatch(UserActions.changeEmail(this.state.currentlyPassword, this.state.newEmail));

    this.setState({
      currentlyPassword: '',
      newEmail: ''
    })
  }

  handleSubmitName = () => {
    this.setState({ submittedName: true }, () => {
      setTimeout(() => this.setState({ submittedName: false }), 5000);
    });
    this.props.dispatch(UserActions.changeName(this.state.name, this));
  }

  handlePassword = event => {
    if (event.target.name == 'currentlyPassword') {
      this.setState({
        currentlyPassword: event.target.value 
      })
    } else if (event.target.name == 'newPassword') {
      this.setState({
        newPassword: event.target.value 
      })
    } else if (event.target.name == 'confirmPassword') {
      this.setState({
        confirmPassword: event.target.value 
      })
    }
  }

  handleEmail = event => {
    if (event.target.name == 'currentlyEmail') {
      this.setState({
        currentlyEmail: event.target.value 
      })
    } else if (event.target.name == 'newEmail') {
      this.setState({
        newEmail: event.target.value 
      })
    } else if (event.target.name == 'confirmEmail') {
      this.setState({
        confirmEmail: event.target.value 
      })
    }
  }

  handleName = event => {
    this.setState({ name: event.target.value })
  }

  render() {
    const { formData, submitted, submittedPassword, user } = this.state;

    return (
      <div>
        {(localStorage.getItem('userId'))? (
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <ValidatorForm
              ref="form"
              onSubmit={this.handleSubmit}
             >
              <Grid container justify="center" spacing={8}>
                <Grid item>
                  <TextValidator
                    label="Nickname"
                    onChange={this.handleChange}
                    name="nickname"
                    value={formData.nickname}
                    validators={['required']}
                    errorMessages={['this field is required']}
                  />
                </Grid>
              </Grid>

              <Grid container justify="center" spacing={8}>
                <Grid item>
                  <Grid container justify="space-between" spacing={8}>
                    <Grid item>
                      <TextValidator
                        label="Country"
                        onChange={this.handleChange}
                        name="country"
                        value={formData.country}
                      /> 
                    </Grid>
                    <Grid item>
                      <TextValidator
                        label="City"
                        onChange={this.handleChange}
                        name="city"
                        value={formData.city}
                    />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container justify="center" spacing={8}>
                <Grid item>
                  <Grid container justify="center" spacing={8}>
                    <Grid item>
                      <FormControl>
                        <InputLabel htmlFor="age-native-simple">Gender</InputLabel>
                        <Select
                          native
                          value={formData.gender}
                          onChange={this.handleChange}
                          inputProps={{
                            name: 'gender',
                            id: 'age-native-simple',
                          }}
                        >
                          <option value={'none'}>-</option>
                          <option value={'man'}>Man</option>
                          <option value={'woman'}>Woman</option>
                        </Select>
                      </FormControl>
                    </Grid>
                    
                    <Grid item>
                    {(this.props.user.email.length > 0)? (
                      <TextField
                        id="birthday"
                        label="Birthday"
                        type="date"
                        name="birthday"
                        defaultValue={this.props.user.birthday}
                        onChange={this.handleChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      ): 'na joj'}
                    </Grid>
                  </Grid>
                  
                </Grid>
              </Grid>

              <Grid container justify="center" spacing={8}>
                <Grid item>
                  <Button
                      type="submit"
                      disabled={submitted}
                  >
                      {
                          (submitted && 'Your form is submitted!')
                          || (!submitted && 'Update')
                      }
                  </Button>
                </Grid>
              </Grid>
            </ValidatorForm>

            <Col md={8} offset={{ md: 2 }}>
              <Grid container justify="center" spacing={8}>
                <Grid item>
                  <PasswordSettingsContainer
                    handlePassword={this.handlePassword}
                    currentlyPassword={this.state.currentlyPassword}
                    newPassword={this.state.newPassword}
                    confirmPassword={this.state.confirmPassword}
                    handleSubmitPassword={this.handleSubmitPassword}
                    submittedPassword={submittedPassword}
                   >
                  </PasswordSettingsContainer>
                </Grid>
              </Grid>
            </Col>

            {(this.props.user.email == 'admino')? (''): (
            <Col md={10} offset={{ md: 1 }}>
              <Grid container justify="center" spacing={8}>
                <Grid item>
                  <EmailSettingsContainer 
                    handleEmail={this.handleEmail}
                    handlePassword={this.handlePassword}
                    currentlyPassword={this.currentlyPassword}
                    newEmail={this.state.newEmail}
                    handleSubmitEmail={this.handleSubmitEmail}
                    submittedEmail={this.submittedEmail}
                  />
                </Grid>
              </Grid>
            </Col>
            )}

            {(this.props.user.email == 'admino')? (''): (
            <Col md={10} offset={{ md: 1 }}>
              <Grid container justify="center" spacing={8}>
                <Grid item>
                  <NameSettingsContainer
                    handleName={this.handleName}
                    name={this.state.name}
                    handleSubmitName={this.handleSubmitName}
                    submittedName={this.submittedName}
                  />
                </Grid>
              </Grid>
            </Col>
            )}

            <Grid container justify="center" spacing={8}>
              <Grid item>
                <AvatarSettingsContainer avatar={this.state.avatar} />
              </Grid>
            </Grid>

            <Grid container justify="center" spacing={8}>
              <Grid item>
                <Link to="/select/team">Select Team</Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        ) : (<Redirect to='/login' />) }
      </div>
    )
  }
};

