import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ImageInput from './ImageInput'
import serializeForm from 'form-serialize'

// added link and form incl ImageInput in 5.6
// taking advantage of Router to pass submit data back to App component instead of browser
// added serializer to pass submitted form data back up to App as a JS object

class CreateContact extends Component {

	// define a handler for controlled component
	handleSubmit = (event) => {
		event.preventDefault() 				// the browser will no longer submit the form for us
		const values = serializeForm(event.target, { hash: true }) 		// serialize form data as JS obj
		if (this.props.onCreateContact) {
			this.props.onCreateContact(values) 	// pass values back up to App component to store contact
		}
	}

	render() {
		return (
			<div>
				<Link className='close-create-contact' to='/'>Close</Link>
				<form onSubmit={this.handleSubmit} className='create-contact-form'>
					<ImageInput
						className='create-contact-avatar-input'
						name='avatarURL'
						maxHeight={64}
					/>
					<div className='create-contact-details'>
						<input type='text' name='name' placeholder='Name'/>
						<input type='text' name='email' placeholder='Email'/>
						<button>Add Contact</button>
					</div>
				</form>
			</div>
		)
	}
}

export default CreateContact