var BootstrapButton = React.createClass({
  render: function(){
    var {...other} = this.props;
    return(
    	<div className="form-group">
      		<button type="button" className="btn btn-primary" {...other}>{this.props.text}</button>
      	</div>
      );
  }
});