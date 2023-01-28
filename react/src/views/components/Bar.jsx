import logo from "../images/kingston_logo.png"

let Bar = () => (
    <div className="bar-header">
        <img src={logo} alt='haha toobad' />
        <div>
            <h1>Kingsley</h1>
            <h2>Your guide to Kingston</h2>
        </div>
        <img src={logo} className="image" alt="whoops" />
    </div>
)

export default Bar