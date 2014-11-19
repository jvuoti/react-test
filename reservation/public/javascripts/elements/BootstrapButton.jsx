var BootstrapButton = React.createClass({
  render: function(){
    var {...other} = this.props;
    return(
      <button type="button" className="btn btn-primary" {...other}>{this.props.text}</button>
      );
  }
});