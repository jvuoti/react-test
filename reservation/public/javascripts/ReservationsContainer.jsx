
var ReservationsContainer = React.createClass({
	getInitialState: function(){
		var state = {
			nodes: [
			{text: "foo", top: 50, left: 50},
			{text: "bar", top: 250, left: 50},
			{text: "baz", top: 450, left: 50}
			]
		};
		return state; 
	},
	render: function(){
		var nodes = this.state.nodes.map(function(entry){
			return (        
				<GraphNode text={entry.text} top={entry.top} left={entry.left} />
			);
		});
		return (
			<div id="reservationsContainer" className="row">
				<div id="graph" className="col-md-8">
					{nodes}
				</div>
				<ReservationEditor citiesDataUrl="/api/cityData" reservationUrl="/api/reserve" className="col-md-4" />
			</div>
		);
	}
});

React.render(<ReservationsContainer />, document.getElementById('reservationsContainer'));