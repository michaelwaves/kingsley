{ commentData.map((comment) => comment.user === "human" ? <Comment text={comment.text} /> : <AIComment text={comment.text} />) }
                <Comment text="what is kingston?" />
                <AIComment text="kingston is a small city beside lake ontario" />
                <Comment text={title} />

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