import React from 'react'

class BoxShowContainer extends React.Component {
	render() {
		return (
	  		<div>
				<div onClick={() => this.props.showBox(0)}>none</div>
				<div onClick={() =>this.props.showBox(1)}>block</div>
				<div onClick={() =>this.props.showBox(2)}>delete</div>
			</div>
		)
	}
}

export default BoxShowContainer