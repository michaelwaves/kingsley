import Comment from "./components/Comment";
import Bar from "./components/Bar";

function Chatbot() {
    return (
        <div className="chatbot">
            <Bar />
            <div className="chatbot-body" >
                <Comment text="I love Kingston" />
            </div>
        </div>
    )
}

export default Chatbot