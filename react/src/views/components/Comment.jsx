
function Comment(props) {
    const date = new Date();
    const showTime = date.getHours()
        + ':' + date.getMinutes();
    //+ ":" + date.getSeconds();
    return (
        <>
            <p>{showTime}</p>
            <div>{props.text}</div>
        </>
    )
}

export default Comment