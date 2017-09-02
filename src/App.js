import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListContacts from './ListContacts.js'
import CreateContact from './CreateContact.js'
import * as ContactsAPI from './utils/ContactsAPI.js'

// the main App component
// 	- open ./index.js to see that React DOM renders this App.js to 'root' div in ../public/index.html 
// 	- open ListContact.js to see contacts list code
// 	- moved static list of contacts inside of App component in lesson 3
// 	- made contacts part of state, passed this.state.contacts into ListContacts component
// 	- emptied contacts list, added lifecycle and imported ContactsAPI to fetch data in lesson 4
// 	- added state to simulate routing in lesson 5, then implemented real Router components lesson 5

class App extends Component {
	
	// - hardcoded contacts list input during Lesson 3 per instructions
	// - changed to an empty array in 4.2 to fill in componentDidUpdate API calls 
	// - added screen state to mimic routing in 5.2, removed in 5.5
	state = {
		contacts: []
	}

	// lifecycle event - ideal for Ajax, fetching data
	componentDidMount() {
		ContactsAPI.getAll().then((contacts) => {
			this.setState({contacts}) 		// short for {contacts:contacts}
		})
	}

	// function to pass to ListContacts in order to delete a contact
	removeContact = (contact) => {
		this.setState((prevState) => ({
			contacts: prevState.contacts.filter((c) => c.id !== contact.id)
		}))

		// added to remove from db via API in 4.2
		ContactsAPI.remove(contact)
	}

	// added in 5.6 to take submit data from CreateContact form, add db contact, change state
	createContact(contact) {
		ContactsAPI.create(contact).then(contact => {
			this.setState((state) => ({											// change state.contacts to include this one
				contacts: state.contacts.concat([contact])
			}))
		})
	}

	// pass function to remove contacts to ListContact as its onDeleteContact prop
	render() {
		// added short-circuit evaluation to mimic React Router in 5.2; removed in 5.5
		// added contact render and history in 5.6
	  return (
	  	<div>
	    	<Route exact path='/' render={() => (
	    		<ListContacts
						onDeleteContact={this.removeContact}
						contacts={this.state.contacts}
					/>
	     	)}/>
	     	<Route path='/create' render={({ history }) => (
	     		<CreateContact onCreateContact={(contact) => {
	     			this.createContact(contact)
	     			history.push('/')
	     		}}/>
	     	)}/>
	    </div>
	  )
  }
}

export default App
