var GraphNode = React.createClass({
	render: function(){
		var {top, left, text, ...other} = this.props;
		var nodeStyle = {
			position: "absolute",
			top: top,
			left: left
		};

		return (
			<div className="graph-node" style={nodeStyle} {...other}>
				<span className="label label-primary">{text}</span>
			</div>
		);
	}
});