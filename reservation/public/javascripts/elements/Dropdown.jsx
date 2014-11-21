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
        <label className="form-label" htmlkFor={this.props.id}>{this.props.label}</label>
        <select className="form-control" id={this.props.id} value={this.props.selectedValue} {...other}>
          {options}
        </select>
      </div>
      );
  }
});