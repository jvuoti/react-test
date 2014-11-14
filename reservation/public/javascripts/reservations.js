

var Dropdown = React.createClass({displayName: 'Dropdown',
  render: function(){
    var $__0=      this.props,entries=$__0.entries,id=$__0.id,label=$__0.label,selectedValue=$__0.selectedValue,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{entries:1,id:1,label:1,selectedValue:1});
    var options = _.map(this.props.entries, function(entry){
      return (        
        React.createElement("option", {key: entry, value: entry}, entry)
        );
    });
    return (
      React.createElement("div", {className: "form-group"}, 
        React.createElement("label", {className: "form-label", for: this.props.id}, this.props.label), 
        React.createElement("select", React.__spread({className: "form-control", id: this.props.id, value: this.props.selectedValue},  other), 
          options
        )
      )
      );
  }
});

var BootstrapButton = React.createClass({displayName: 'BootstrapButton',
  render: function(){
    var $__0=  this.props,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{});
    return(
      React.createElement("button", React.__spread({type: "button", className: "btn btn-primary"},  other), this.props.text)
      );
  }
});

var Reservations = React.createClass({displayName: 'Reservations',
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
      React.createElement("div", {className: "reservations"}, 
        React.createElement(Dropdown, {id: "country", label: "Country", entries: countries, selectedValue: this.state.selectedCountry, onChange: this.changeCountry}), 
        React.createElement(Dropdown, {id: "city", label: "City", entries: citiesForSelectedCountry, selectedValue: this.state.selectedCity, onChange: this.changeCity}), 
        React.createElement(BootstrapButton, {text: "Submit", onClick: this.submit})
      )
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

React.render(React.createElement(Reservations, null), document.getElementById('reservations'));