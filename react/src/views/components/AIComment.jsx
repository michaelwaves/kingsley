
function AIComment(props) {
    const date = new Date();
    const showTime = date.getHours()
        + ':' + date.getMinutes();
    //+ ":" + date.getSeconds();
    return (
        <div className="comment">
            <p>{showTime}</p>
            <div className="ai-comment-name"><p>Kingsley</p></div>
            <div className="ai-comment-text">
                <p>{props.text}</p>
            </div>
        </div>
    )
}

export default AIComment