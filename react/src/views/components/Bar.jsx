import logo from "../images/kingston_logo.png"
import kingsley from "../images/kingsley.png"

let Bar = () => (
    <div className="bar-header">
        <img className="logo-img" src={kingsley} alt='haha toobad' />
        <div className="bar-text">
            <h1>Kingsley</h1>
            <h2>Your guide to Kingston</h2>
        </div>
        <img className="bar-img" src={logo} alt="whoops" />
    </div>
)

export default Bar