const Notication = ({message, bool}) =>{
    if(message === null){
        return null
    }
    return(
        <div className="error">
            {message}
        </div>
    )
}
export default Notication