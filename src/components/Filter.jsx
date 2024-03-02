const Filter = (props) => {
    return (
        <p>Search: <input value={props.filter} onChange={props.handleFilterChange}/></p>
    )
}


export default Filter