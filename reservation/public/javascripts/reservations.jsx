

var Dropdown = React.createClass({
  render: function(){
    var {entries, id, label, selectedValue, ...other} = this.props;
    var options = _.map(this.props.entries, function(entry){
      return (        
        <option key={entry} value={entry}>{entry}</option>
        );
    });
    return (
      <div className="form-group">
        <label className="form-label" for={this.props.id}>{this.props.label}</label>
        <select className="form-control" id={this.props.id} value={this.props.selectedValue} {...other}>
          {options}
        </select>
      </div>
      );
  }
});

var BootstrapButton = React.createClass({
  render: function(){
    var {...other} = this.props;
    return(
      <button type="button" className="btn btn-primary" {...other}>{this.props.text}</button>
      );
  }
});

var Reservations = React.createClass({
  getInitialState: function() {
    var state = {
      cities: {
        "Finland": ["Helsinki", "Tampere", "Oulu"],
        "Sweden": ["Stockholm", "Gothenburg", "Visby"]
      },
      selectedCountry: "Finland",
      selectedCity: "Helsinki"
    };
    return state;
  },
  render: function() {

    var countries = Object.keys(this.state.cities);
    var selectedCountry = this.state.selectedCountry;
    var citiesForSelectedCountry = this.state.cities[this.state.selectedCountry];

    return (
      <div className="reservations">
        <Dropdown id="country" label="Country" entries={countries} selectedValue={this.state.selectedCountry} onChange={this.changeCountry}/>
        <Dropdown id="city" label="City" entries={citiesForSelectedCountry} selectedValue={this.state.selectedCity} onChange={this.changeCity}/>
        <BootstrapButton text="Submit" onClick={this.submit}/>
      </div>
      );
  },
  changeCountry: function(event){
    this.setState({
      selectedCountry: event.target.value,
      selectedCity: this.state.cities[event.target.value][0]
    });
  },
  changeCity: function(event){
    this.setState({selectedCity: event.target.value});
  },
  submit: function(){

  }
});

React.render(<Reservations />, document.getElementById('reservations'));