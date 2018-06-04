import React from 'react';
import Systems from './systems.jsx';
import Collection from "./collection.jsx";
import Item from "./item.jsx";


function mapArr(s, d, p) {
	for( var i in s ) d[(p || '')+s[i].id] = s[i];
}

function mapNested(s, d) {
	for(var i in s) mapArr(s[i], d, i+'-')
}

export default class Ship extends React.Component {
	constructor(props) {
		super(props);

		this.data = {...props.data};
		this.data.shields.unshift({id: 'none', name: 'No Shields', costs: 0, shield: 0});
		this.data.computer.unshift({id: 'none', name: 'No Computer', costs: 0});

		this.systems = React.createRef();
		this.weapons = React.createRef();

		this.categories = [
				{id: 'hull', title: 'Hull', value: 'id', disabled: o => false},
				{id: 'power', title: 'Reactor', pattern: '{type} {id}', value: 'output', disabled: o => this.state.hull < o.size},
				{id: 'structure', title: 'Structure', value: 'structure', disabled: o => false},
				{id: 'armor', title: 'Armor', value: 'armor', disabled: o => false},
				{id: 'shields', title: 'Shields', value: 'shield', pattern: 'Class {id}', disabled: o => false},
				{id: 'sensors', title: 'Sensors', disabled: o => false},
				{id: 'computer', title: 'Computer', disabled: o => false},
		];

		this.mapped = {};
		this.defaults = {
			power: 'fusion-1',
			systems: {},
			weapons: [],
			drones: []
		};

		for( var i in this.data.power.fusion )
			this.data.power.fusion[i].type = 'Fusion';
		for( var i in this.data.power.antimatter )
			this.data.power.antimatter[i].type = 'Antimatter';

		for( var i in this.data ) {
			this.mapped[i] = {};
			if(i=='power') mapNested(this.data[i], this.mapped[i]);
			else mapArr( this.data[i], this.mapped[i] );
			if(!this.defaults[i] && i != 'mods') this.defaults[i] = this.data[i][0].id;
		}

		this.state = {
			...this.defaults,
			...props.ship,
			selected: this.data.weapons[0].id
		};

		this.updateFiled = this.updateFiled.bind(this);
		this.addWeapon = this.addWeapon.bind(this);
		this.parse = this.parse.bind(this);
	}

	updateFiled(k, v) {
		this.setState({[k]: v});
	}

	addWeapon() {
        this.weapons.current.add({
			id: Date.now(),
			type: this.state.selected,
			mods: {}
		});
	}

	parse( c ) {
		if(typeof c === 'undefined')
			return ' ';
		else if(c.expression)
			return Math.max(0, Math.round(eval(c.expression.replace(/size/gi, this.state.hull))));
		else
			return c;
	}

	render() {
		var energy = 0;
		var costs = 0;

		let basics = this.categories.map(cat => {
			var options = [];

			var e = this.parse(this.mapped[cat.id][this.state[cat.id]].energy);
			var c = this.parse(this.mapped[cat.id][this.state[cat.id]].costs);

			if(e) energy += e|0;
			if(c) costs += c|0;

			for(let i in this.mapped[cat.id]) {
				let o = this.mapped[cat.id][i];
				let name = o. name || cat.pattern.replace(/{(\w+)}/g, m => o[m.substring(1, m.length-1)]);
				options.push(<option value={i} key={i} disabled={cat.disabled(o)}>{name} ({this.parse(o.costs)} SP)</option>);
			}

			return <tr key={cat.id}>
				<td>{cat.title}:</td>
				<td><select className="form-control" onChange={e => this.updateFiled(cat.id, e.target.value)}>{options}</select></td>
				<td className="value">{this.parse(this.mapped[cat.id][this.state[cat.id]][cat.value])}</td>
				<td className="costs">{c}</td>
				<td className="energy">{e}</td>
			</tr>;
		});

		var sys_energy = 0;
		var sys_costs = 0;

		Systems.calc(this.data.systems, this.state.systems, this.parse, s => {
			sys_costs += s.costs;
			sys_energy += s.energy;
		});

		costs += sys_costs;
		energy += sys_energy;

		return <div>
			<h1>Schiffsgenerator</h1>

			<table className="table summary">
				<thead>
					<tr>
						<th>System</th>
						<th>Selection</th>
						<th>Value</th>
						<th>Costs</th>
						<th>Energy</th>
					</tr>
				</thead>

				<tbody>
					{basics}

					<tr>
						<td colSpan="3">Systems:</td>
						<td>{sys_costs}</td>
						<td>{sys_energy}</td>
					</tr>


					<tr>
						<th colSpan="3">Total:</th>
						<th>{costs}</th>
						<th>{energy} / {this.mapped.power[this.state.power].output}</th>
					</tr>
				</tbody>
			</table>

			<h2>Weapons</h2>

			<div className="input-append hidden-print">
				<select onChange={e => this.setState({selected: e.target.value})}>
                    {this.data.weapons.map(s => <option value={s.id} key={s.id}>{s.name}</option>)}
				</select>

				<button className="btn btn-default" type="button" onClick={this.addWeapon}>Add
				</button>
			</div>

			<Collection component={Item}
						items={this.state.weapons}
						onChange={v => this.updateFiled('weapons', v)}
						ref={this.weapons}
						itemDefinitions={this.mapped.weapons}
						modDefinitions={this.mapped.mods}
						id="weapons" />

			<Systems parse={this.parse}
			         ref={this.systems}
			         data={this.data.systems}
			         systems={this.state.systems}
			         onChange={v => this.updateFiled('systems', v)} />
		</div>;
	}
}