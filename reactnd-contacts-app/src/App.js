import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import ListContacts from './ListContacts'
import CreateContact from './CreateContact'

import * as contactsAPI from './utils/ContactsAPI'

class App extends Component {
  state = {
    contacts: [],
  } 

  componentDidMount() {
    contactsAPI
      .getAll()
      .then((contacts) => {
        this.setState(() => ({
          contacts
        }))
      })
  }

  // Since our contacts are living here, we need to change the state here, so we will pass
  // a callback function to the children to do this.
  removeContact = (contact) => {
    this.setState((currentState) => ({
      contacts: currentState.contacts.filter(c => c.id !== contact.id)
    }))

    contactsAPI.remove(contact)
  }

  createContact = contact => {
    contactsAPI
      .create(contact)
      .then((contact) => {
        this.setState((currentState) =>({
          contacts: currentState.contacts.concat([contact])
        }))
      })
  }

  
  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <ListContacts 
            contacts={this.state.contacts} 
            onDeleteContact={this.removeContact}
          />
        )}/>
        <Route path='/create' render={({ history }) => (
          <CreateContact 
            onCreateContact={(contact) => {
              this.createContact(contact)
              history.push('/')
            }} />
        )} />
        {/* <Route path='/create' component={CreateContact} /> */}
      </div>
    )
  }
}

export default App
