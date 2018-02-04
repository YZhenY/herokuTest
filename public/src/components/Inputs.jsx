class Inputs extends React.Component {

  constructor(props) {
    super(props);
  }

  handleClick(e) {
    console.log($('#name').val());
    window.ApiCall();
  }
  render() {
    return (
      <div id="inputs" className="container">
        <div className="inputBox">
          <input 
            id="name" 
            placeholder="Name" 
            type="text"
          />
        </div>
        <div className="inputBox">
          <input 
            id="email" 
            placeholder="Email Address" 
            type="email"
          />
        </div>
        <div className="inputBox">
          <button 
            onClick={this.handleClick.bind(this)} 
            id="submit">Send MocuSign
          </button>
        </div>
      </div>
    )
  }

}
window.Inputs = Inputs;
