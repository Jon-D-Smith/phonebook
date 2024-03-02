import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import contactsService from './services/persons'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [filtered, setFiltered] = useState([])
  const [notification, setNotification] = useState(null)
  const [notificationType,setNotificationType] = useState()

  useEffect(() => {
  contactsService.getAll().then(response => {
    setPersons(response)
  })
   }
  , [])

  const checkPerson = () => {
    let names = persons.map((person) => person.name) 
    if (names.includes(newName)){
      if(window.confirm(`${newName} already exists. Would you like to update their phone number?`)){
        const person = persons.find(person => person.name == newName)
        const newObject = {...person, number : newNumber}
        updateNumber(person.id,newObject)

      }

      return true
    }
    return false
  }

  const addContact = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if(checkPerson(personObject[name])){
      return false
    }
    contactsService.create(personObject)
                  .then(response => {
                    setPersons(persons.concat(response))
                    setNewName("")
                    setNewNumber("")
                    setNotification(`${response.name} has been added to contacts`)
                    setNotificationType('success')
                    
                    setTimeout(() => {
                      setNotification(null)
                      setNotificationType('')
                    }, 5000)
                  })
  }

  const deleteContact = (id, name) => {
    if(window.confirm(`Are you sure you want to delete ${name}?`)){
      contactsService.remove(id)
      .then(setPersons(persons.filter(p => p.id !== id)))
      .catch(error => {
                    setNotification(`${name} has already been removed from the server`)
                    setNotificationType('error')
                    
                    setTimeout(() => {
                      setNotification(null)
                      setNotificationType('')
                    }, 5000)
      })

    }

  }

  const updateNumber = (id,newObject) => {
    contactsService.update(id,newObject)
    .then(response => {
      setPersons(persons.map(person => person.id !== id ? person : response))
      setNewName("")
      setNewNumber("") 
    })
    .catch(error => {
      setNotification(`${newObject.name} has already been removed from the server`)
      setNotificationType('error')
      
      setTimeout(() => {
        setNotification(null)
        setNotificationType('')
      }, 5000)
})
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    const filteredContacts = persons.filter(person => person.name.includes(event.target.value))
    setFiltered(filteredContacts)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type={notificationType} message={notification} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add A New</h3>
      <PersonForm addContact={addContact} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons filter={filter} persons={persons}  filtered={filtered} deleteContact={deleteContact}/>
    </div>
  )
}

export default App