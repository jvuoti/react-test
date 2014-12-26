var ReservationEditor = React.createClass({
  getInitialState: function() {      
    var state = {
      cities: {},
      selectedCountry: this.props.selectedCountry || "Finland",
      selectedCity: this.props.selectedCity || "Helsinki",
      editor: '<div/>'
    };
    return state;
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.citiesDataUrl,
      dataType: 'json',
      success: function(data) {
        var cityData = {};
        data.forEach(function(entry){
          cityData[entry.country] = entry.cities;
        });
        this.setState({cities: cityData});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.citiesDataUrl, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {

    var {...other} = this.props;    
    var countries = Object.keys(this.state.cities);
    var selectedCountry = this.state.selectedCountry;
    var citiesForSelectedCountry = this.state.cities[this.state.selectedCountry];

    return (
      <div id="reservationEditor" {...other}>
        <Dropdown id="country" label="Country" entries={countries} selectedValue={this.state.selectedCountry} onChange={this.changeCountry}/>
        <Dropdown id="city" label="City" entries={citiesForSelectedCountry} selectedValue={this.state.selectedCity} onChange={this.changeCity}/> 
        {this.state.editor}
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
     $.ajax({
      url: '/api/editor/' +event.target.value,
      dataType: 'html',
      success: function(data) {
        this.setState({editor: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.city, status, err.toString());
      }.bind(this)
    });
    

  },
  submit: function(){
    var selectionData = {
        country: this.state.selectedCountry,
        city: this.state.selectedCity,
        data: this.state
      };
    $.ajax({
      type: "POST",
      url: this.props.reservationUrl,
      data: selectionData,
      success: function(data) {
        this.props.onSave(selectionData);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.citiesDataUrl, status, err.toString());
      }.bind(this)
    });
  }
});