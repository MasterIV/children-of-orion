import React from 'react';
import Collection from './collection.jsx';

class Requirement extends React.Component {
	constructor(props) {
		super(props);

		this.updateFiled = this.updateFiled.bind(this);
	}

	updateFiled(f, v) {
		var r = this.props;
		r[f] = v;

		this.props.onChange({
			type: r.type,
			value: r.value,
			min: r.min|0
		});
	}

	render() {
		var options = [];

		if(this.props.type === 'attributes')
			data.attributes.forEach(a => options.push(<option key={a.id} value={a.id}>{a.name}</option>));
		else
			for(var k in data[this.props.type])
				data[this.props.type][k].forEach(a => options.push(<option value={a.id} key={a.id}>{k}: {a.name}</option>));

		return <div className="requirement">
			<select onChange={e => this.updateFiled('type', e.target.value)} className="input-medium" value={this.props.type}>
				<option>attributes</option>
				<option>skills</option>
				<option>talents</option>
			</select>

			<select value={this.props.value} onChange={e => this.updateFiled('value', e.target.value)}>
				{options}
			</select>

			<input type="number" className="input-mini" value={this.props.min} onChange={e => this.updateFiled('min', e.target.value)}/>

			<button className="btn btn-danger" onClick={this.props.onDelete}>X</button>
		</div>;
	}
}


export default class Requirements extends React.Component {
	constructor(props) {
		super(props);

		this.requirements = this.props.requirements ? [...this.props.requirements] : [];

		this.updateRequirement = this.updateRequirement.bind(this);
		this.deleteRequirement = this.deleteRequirement.bind(this);
		this.addRequirement = this.addRequirement.bind(this);
	}

	updateRequirement(i, data) {
		this.requirements[i] = data;
		this.props.onChange(this.requirements);
	}

	deleteRequirement(i) {
		this.requirements.splice(i, 1);
		this.props.onChange(this.requirements);
	}

	addRequirement() {
		this.requirements.push({
			type: 'attributes',
			value: 'Con',
			min: 1
		});

		this.props.onChange(this.requirements);
	}

	render() {
		var requirements = this.requirements.map((r, i) => <Requirement {...r} onChange={v => this.updateRequirement(i, v)} onDelete={() => this.deleteRequirement(i)} />);

		return <div className="clearfix">
			<div className="pull-right"><button className="btn badge-success" onClick={this.addRequirement}>+</button></div>
			{requirements}
		</div>;
	}
}

