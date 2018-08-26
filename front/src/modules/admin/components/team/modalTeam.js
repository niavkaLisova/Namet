import React from 'react'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import Icon from '@material-ui/core/Icon'

import { Container, Row, Col } from 'react-grid-system'


class ModalTeam extends React.Component {
  	render() {
    return (
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          scroll='paper'
          aria-labelledby="scroll-dialog-title"
        >
        	<DialogTitle id="scroll-dialog-title" class='modalEdit'>Edit Team

        		<Button  variant='fab' onClick={this.props.handleClose} color="default"  style={{float: 'right'}}>
          			<Icon>clear</Icon>
        		</Button>
        	</DialogTitle>
          		<DialogContent>

	          		<Grid container spacing={8}>
	       				<Grid item xs={12}>

		              		<ValidatorForm
		                		ref="form"
		                		onSubmit={this.props.handleSubmit}
		            		 >
		          				<Grid container justify="center" spacing={8}>
	              					<Grid item>
		              					<TextValidator
					                    	label="Name"
					                    	onChange={this.props.handleChange}
					                    	name="name"
					                    	value={this.props.team.name}
					                    	validators={['required']}
					                    	errorMessages={['this field is required']}
					                	/><br />
					                	<TextValidator
					                    	label="Color"
					                    	onChange={this.props.handleChange}
					                    	name="color"
					                    	value={this.props.team.color}
					                    	validators={['required']}
					                    	errorMessages={['this field is required']}
					                	/>
				                	</Grid>
				                	<Grid item>
				                		<div>
					                		Emblem:
					                		<input
											 	accept="image/*"
												id="upload-file"
												type="file"
												onChange={this.props.handleChangeImage}
											/>
										</div>
										<div>
											Point:
											<input
											 	accept="image/*"
												id="upload-file-point"
												type="file"
												onChange={this.props.handleChangePoint}
											/>
										</div>
				                	</Grid>
              					</Grid>

              					<Grid container justify="center" spacing={8}>
              						<br /><br />
              						<Button
				                		onClick={this.props.handleDeleteTeam}
				                	>
				                    Delete
				                	</Button>
	              					<Button
				                    	type="submit"
				                    	disabled={this.props.submitted}
				                	>
				                    {
				                        (this.props.submitted && 'Your form is submitted!')
				                        || (!this.props.submitted && 'Update')
				                    }
				                	</Button>
              					</Grid>

              				</ValidatorForm>
	        			</Grid>
	        
	       			</Grid>
	            	
          		</DialogContent>
        	</Dialog>
    );
  }
}

export default ModalTeam;