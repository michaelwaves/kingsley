import speaker from "../images/speaker-wave-2.svg"

function Speech(props) {
  const msg = new SpeechSynthesisUtterance()

  const speechHandler = (msg) => {
    msg.text = props.text
    window.speechSynthesis.speak(msg)
  }

  return (
    <input type="image" src={speaker} alt="whoops" className="icon" onClick={() => speechHandler(msg)} />

  )
}

export default Speech