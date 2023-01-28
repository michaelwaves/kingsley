import Comment from "./components/Comment";
import AIComment from "./components/AIComment";
import Bar from "./components/Bar";
import Input from "./components/Input";

function Chatbot() {
    return (
        <div className="chatbot">
            <Bar />
            <div className="chatbot-body" >
                <Comment text="what is kingston?" />
                <AIComment text="kingston is a small city beside lake ontario" />
            </div>
            <Input />
        </div>
    )
}

export default Chatbot