import React from 'react';
import Requirements from './requirements.jsx';

export default class Talent extends React.Component {
	constructor(props) {
		super(props);

		this.updateFiled = this.updateFiled.bind(this);
	}

	updateFiled(k, v) {
		var data = this.props;
		data[k] = v;
		this.props.onChange(this.props.index, {
			id: data.name.toLowerCase().replace(/[\W\s]+/, '_'),
			name: data.name,
			description: data.description,
			rank: data.rank | 0,
			level: data.level | 0,
			formula: data.formula,
			requirements: data.requirements
		});
	}

	render() {
		var requirements = this.props.requirements ? this.props.requirements : [];

		return <div className="well talent form-inline">
			<div className="pull-right">
				<button className="btn btn-danger" onClick={() => this.props.onDelete(this.props.index)}>X</button>
			</div>
			<div>
				<input type="text" value={this.props.name}
				       onChange={e => this.updateFiled('name', e.target.value)}/>

				<label for={'rank_'+this.props.index}>Rank:</label>
				<input id={'rank_'+this.props.index}
				       className="input-mini"
				       type="number" min="1" max="3"
				       value={this.props.rank}
				       onChange={e => this.updateFiled('rank', e.target.value)}/>

				<label for={'level_'+this.props.index}>Level:</label>
				<input id={'level_'+this.props.index}
				       className="input-mini"
				       type="number" min="0"
				       value={this.props.level|0}
				       onChange={e => this.updateFiled('level', e.target.value)}/>
			</div>

			{this.props.level > 1 && <div>
				<label for={'formula_'+this.props.index}>Formula:</label>
				<input type="text" value={this.props.formula}
				       id={'formula_'+this.props.index}
				       onChange={e => this.updateFiled('formula', e.target.value)}
				       className="input-xlarge"/>
			</div>}

			<div>
				<textarea onChange={e => this.updateFiled('description', e.target.value)}
				          className="description" value={this.props.description} />
			</div>

			<Requirements requirements={requirements} key={'req_'+this.props.name}
			              onChange={d => this.updateFiled('requirements', d)}/>
		</div>;
	}
}

