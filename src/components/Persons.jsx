const Persons = (props) => {

    return (
        <>
        {props.filter === '' && props.persons.map(person => (<p key={person.id}>{person.name}: {person.number} <button onClick={() => props.deleteContact(person.id,person.name)}>delete</button></p>))}
        {props.filter != '' && props.filtered.map(person => (<p key={person.id}>{person.name}: {person.number} <button onClick={() => props.deleteContact(person.id,person.name)}>delete</button></p>))}
        </>
    )
    
}

export default Persons