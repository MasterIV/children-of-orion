import React from 'react';

function range(min, max) {
	console.log(min, max);
	return [...Array(max - min).keys()].map(k => k + min);
}

export default class Systems extends React.Component {
	static calc(all, selected, parse, callback) {
		return all.filter(s => selected[s.id]).map(system => {
			let s = {...system};
			s.max = parse( s.max ? s.max : 1 );
			s.count = Math.min(s.max, selected[s.id]);
			s.energy = parse(s.energy)*s.count;
			s.costs = parse(s.costs)*s.count;
			return callback(s);
		});
	}

	constructor(props) {
		super(props);

		this.state = {
			selected: props.data[0].id
		};

		this.update = this.update.bind(this);
	}

	update(s, v) {
			let systems = {...this.props.systems};
			if(v === 0) delete systems[s];
			else systems[s] = v || systems[s] || 1;
			this.props.onChange(systems);
	}

	render() {
		let systems = Systems.calc(this.props.data, this.props.systems, this.props.parse, s => <tr key={s.id} disabled={s.max<1}>
				<td>{s.name}</td>
				<td>{s.max > 1 ? <select name="amount"
				                         onChange={e => this.update(s.id, e.target.value|0)}
				                         className="amount input-mini">{range(1, s.max).map(i =>
						<option key={i}>{i}</option>)}</select> : s.max}</td>
				<td className="costs">{s.costs}</td>
				<td className="energy">{s.energy}</td>
				<td className="hidden-print">
					<button type="button" className="btn btn-danger" onClick={e => this.update(s.id, 0)}>x</button>
				</td>
			</tr>);

		return <div>
			<h2>Systems</h2>

			<div className="input-append hidden-print">
				<select id="add-system" onChange={e => this.setState({selected: e.target.value})}>
					{this.props.data.map(s => <option value={s.id} key={s.id}>{s.name}</option>)}
				</select>

				<button className="btn btn-default" type="button" onClick={e => this.update(this.state.selected)}>Add
				</button>
			</div>

			<table className="table">
				<thead>
				<tr>
					<th>System</th>
					<th>Amount</th>
					<th>Costs</th>
					<th>Energy</th>
					<td className="hidden-print"></td>
				</tr>
				</thead>

				<tbody>{systems}</tbody>
			</table>
		</div>;
	}
}