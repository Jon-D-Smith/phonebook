const Notification = ({type, message}) => {
    if (message === null) {
        return null
    }
    const messageClass = type

    return (
      <div className={messageClass}>
        {message}
      </div>
    )
  }

  export default Notification