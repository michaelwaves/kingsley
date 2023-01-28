import Comment from "./components/Comment";
import AIComment from "./components/AIComment";
import Bar from "./components/Bar";
import Input from "./components/Input";
import { useState } from "react";
import mic from "./images/mic-black.svg"
import send from "./images/send-1-svgrepo-com.svg"
import speaker from "./images/speaker-wave-2.svg"
import React from "react";
import ChatBox from "./components/ChatBox";

class AppComponent extends React.Component {
    state = {
        numChildren: 0
    }

    render() {
        const children = [];

        for (var i = 0; i < this.state.numChildren; i += 1) {
            children.push(<ChildComponent key={i} number={i} />);
        };

        return (
            <ParentComponent addChild={this.onAddChild} children={children} />
        );
    }

    onAddChild = () => {
        this.setState({
            numChildren: this.state.numChildren + 1
        });
    }
}

const ParentComponent = props => (
    <div className="card calculator">
        <p><a href="#" onClick={props.addChild}>Add Another Child Component</a></p>
        <div id="children-pane">
            {props.children}
        </div>
    </div>
);

const ChildComponent = props => <div>{"I am child " + props.number}</div>;

function Chatbot() {
    const [title, setTitle] = useState("")
    const commentData = [{ "user": "human", "text": "I love Kingston" },
    { "user": "ai", "text": "me too" },
    { "user": "human", "text": "let's move to Kingston" }]

    return (
        <div className="chatbot">
            <Bar />
            <div className="chatbot-body" >
                {commentData.map((comment) => comment.user === "human" ? <Comment text={comment.text} /> : <AIComment text={comment.text} />)}
                <Comment text="what is kingston?" />
                <AIComment text="kingston is a small city beside lake ontario" />
                <Comment text={title} />
                <ChatBox text={title} />
            </div>
            <div className="input-bar">
                <input type="image" src={mic} alt="whoops" className="icon" />
                <input type="image" src={speaker} alt="whoops" className="icon" />
                <input
                    type="text"
                    className="input-box"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
                <input
                    type="image"
                    src={send}
                    alt="whoops"
                    className="icon"

                />
            </div>
        </div>
    )
}

export default Chatbot