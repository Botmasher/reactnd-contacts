import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

// - implemented in Lesson 3
// - reworked from class to Stateless Functional Component in 3.3
// - refactored to class in 3.7 to manage state of input field as a Controlled Component
// - routing implemented in lesson 5
class ListContacts extends React.Component {

	// moved proptypes in 3.7 from bottom (ListContact.proptypes={} as it was in 3.6)
	static propTypes = {
		contacts: PropTypes.array.isRequired,
		onDeleteContact: PropTypes.func.isRequired
	}

	// added state for Controlled Component
	state = {
		query: ''
	}

	// invoked with onChange eventlistener in input field
	updateQuery = (query) => {
		this.setState({ query: query.trim() })
	}

	// invoked whith button press when displaying filtered contacts
	clearQuery = () => {
		this.setState({ query: '' }) 	// app rerenders and showingContacts below resets to all contacts
	}

	render() {

		// decomposition for prettier variables below
		const { contacts, onDeleteContact } = this.props
		const { query } = this.state

		// filter contacts for pattern matching input query text
		let showingContacts
		if (query) {
			// create a regex that escapes special chars and ignores case
			const match = new RegExp(escapeRegExp(query), 'i')
			// test contact list against regex and only filter in patterns that match
			showingContacts = contacts.filter(contact => match.test(contact.name))
		} else {
			showingContacts = contacts
		}

		showingContacts.sort(sortBy('name'))

		return (
			<div className='list-contacts'>

				<div className='list-contacts-top'>
					<input
						className='search-contacts'
						type='text'
						placeholder='Search contacts'
						value={this.state.query}
						onChange={(event) => this.updateQuery(event.target.value) }
					/>
					<Link to='/create' className='add-contact'>Add Contact</Link>
				</div>

				{showingContacts.length !== contacts.length && (
					<div className='showing-contacts'>
						<span>Showing {showingContacts.length} of {contacts.length} total</span>
						<button onClick={()=>this.clearQuery()}>Show all</button>	
					</div>
				)}

				<ol className='contact-list'>
					{showingContacts.map((contact) => (
						<li className='contact-list-item' key={contact.id}>
							<div className='contact-avatar' style={{
								backgroundImage: `url(${contact.avatarURL})`
							}} />
							<div className='contact-details'>
								<p>{contact.name}</p>
								<p>{contact.email}</p>
							</div>
							<button onClick={ ()=> onDeleteContact(contact) } className='contact-remove'>
								Remove
							</button>
						</li>
					))}
				</ol>

			</div>
		)
	}
}

// be sure to export this component so we can import it and use elsewhere
export default ListContacts
