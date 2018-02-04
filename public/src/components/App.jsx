class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }

    this.url = ''//link to Docusign API.
  }

  render() {
    return(
      <div className="App">
        <NavBar />
        <Inputs />
      </div>
    );
  }
}

window.App = App;