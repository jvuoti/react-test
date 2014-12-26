
var ReservationsContainer = React.createClass({
	getInitialState: function(){
		var state = {
			nodes: [
			{text: "foo", top: 50, left: 50, city: "Denver", country: "US"},
			{text: "bar", top: 150, left: 50, city: "Toronto", country: "Canada"},
			{text: "baz", top: 250, left: 50, city: "Buenos Aires", country: "Argentina"}
			],
			selectedNode: "foo",
		};
		return state; 
	},
	addNewReservation: function(reservationData){
		console.log("add new reservation", reservationData);
		var newReservation ={
			text: reservationData.city,
			top: _.max(_.pluck(this.state.nodes, 'top')) + 100,
			left: 50,
			city: reservationData.city,
			country: reservationData.country 
		}
		var newNodes = this.state.nodes;
		newNodes.push(newReservation);

		this.setState({nodes: newNodes});		
	},
	showNewReservation: function(){
		
	},
	selectNode: function(nodeName){
		console.log("selected node", nodeName);
	},
	render: function(){
		var nodes = this.state.nodes.map(function(entry){
			return (        
				<GraphNode text={entry.text} top={entry.top} left={entry.left} onClick={this.selectNode.bind(this,entry.text)} />
			);
		}, this);
		return (
			<div id="reservationsContainer" className="row">
				<div className="col-md-8">
				<button id="addReservation" className="btn btn-default" onClick={this.showNewReservation}>+</button>
					<div id="graph">					
						{nodes}
					</div>
				</div>
				<ReservationEditor citiesDataUrl="/api/cityData" reservationUrl="/api/reserve" className="col-md-4" onSave={this.addNewReservation}/>
			</div>
		);
	}
});

React.render(<ReservationsContainer />, document.getElementById('reservationsContainer'));