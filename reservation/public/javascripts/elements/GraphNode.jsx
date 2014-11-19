var GraphNode = React.createClass({
	render: function(){
		var nodeStyle = {
			position: "absolute",
			top: this.props.top,
			left: this.props.left
		};

		return (
			<div className="node" style={nodeStyle}>
				<span>{this.props.text}</span>
			</div>
		);
	}
});