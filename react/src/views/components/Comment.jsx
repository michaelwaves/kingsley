
function Comment(props) {
    const date = new Date();
    const showTime = date.getHours()
        + ':' + date.getMinutes();
    //+ ":" + date.getSeconds();
    return (
        <div className="comment">
            <p>{showTime}</p>
            <div className="comment-name"><p>User</p></div>
            <div className="comment-text">
                <p>{props.text}</p>
            </div>
        </div>
    )
}

export default Comment