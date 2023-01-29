/*{ commentData.map((comment) => comment.user === "human" ? <Comment text={comment.text} /> : <AIComment text={comment.text} />) }
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

function ChatBox(props) {
    const [numChildren, setNumChildren] = useState(0)
    const children = []
    const [texts, setTexts] = useState([])

    const handleClicked = () => {
        setNumChildren(numChildren + 1)
        setTexts(() => texts.push(props.text))
    }

    const handleAdd = () => {

    }

    for (var i = 0; i < numChildren; i++) {
        children.push(<Comment text={texts[i + 1]} />)
    }

    const [comments, setComments] = useState([])

    const handleAddComment = () => {
        const newComments = [...comments, []]
        setComments(newComments)
    }
    const handleInputChange = () => {

// Set AssemblyAI Axios Header


const assembly = axios.create({
baseURL: "https://api.assemblyai.com/v2",
headers: {
authorization: "e57632ec05b64828a53817400f54e412",
"content-type": "application/json",
"transfer-encoding": "chunked",
},
})

/*


// Mic-Recorder-To-MP3
const recorder = useRef(null) //Recorder
const audioPlayer = useRef(null) //Ref for the HTML Audio Tag
const [blobURL, setBlobUrl] = useState(null)
const [audioFile, setAudioFile] = useState(null)
const [isRecording, setIsRecording] = useState(null)

useEffect(() => {
//Declares the recorder object and stores it inside of ref
recorder.current = new MicRecorder({ bitRate: 128 })
}, [])

const startRecording = () => {
// Check if recording isn't blocked by browser
recorder.current.start().then(() => {
setIsRecording(true)
})
}

const stopRecording = () => {
recorder.current
.stop()
.getMp3()
.then(([buffer, blob]) => {
    const file = new File(buffer, "audio.mp3", {
        type: blob.type,
        lastModified: Date.now(),
    })
    const newBlobUrl = URL.createObjectURL(blob)
    setBlobUrl(newBlobUrl)
    setIsRecording(false)
    setAudioFile(file)
})
.catch((e) => console.log(e))

submitTranscriptionHandler()
}

const [uploadURL, setUploadURL] = useState("")
const [transcriptID, setTranscriptID] = useState("")
const [transcriptData, setTranscriptData] = useState("")
const [transcript, setTranscript] = useState("")
const [isLoading, setIsLoading] = useState(false)

// Upload the Audio File and retrieve the Upload URL
useEffect(() => {
if (audioFile) {
assembly
    .post("/upload", audioFile)
    .then((res) => setUploadURL(res.data.upload_url))
    .catch((err) => console.error(err))
}
}, [audioFile])

// Submit the Upload URL to AssemblyAI and retrieve the Transcript ID
const submitTranscriptionHandler = () => {
assembly
.post("/transcript", {
    audio_url: uploadURL,
})
.then((res) => {
    setTranscriptID(res.data.id)

    checkStatusHandler()
})
.catch((err) => console.error(err))
}

// Check the status of the Transcript and retrieve the Transcript Data
const checkStatusHandler = async () => {
setIsLoading(true)
try {
await assembly.get(`/transcript/${transcriptID}`).then((res) => {
    setTranscriptData(res.data)
    setTranscript(transcriptData.text)
})
} catch (err) {
console.error(err)
}
}

useEffect(() => {
const interval = setInterval(() => {
if (transcriptData.status !== "completed" && isLoading) {
    checkStatusHandler()
} else {
    setIsLoading(false)
    setTranscript(transcriptData.text)
    setTitle(transcript)
    clearInterval(interval)
}
}, 1000)
return () => clearInterval(interval)
},)
*/