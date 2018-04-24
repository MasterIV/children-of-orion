import React from 'react';
import Talent from './talent.jsx';

export default class Editor extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			category: 'combat',
			talents: props.talents
		};

		// we will store deleted items in this fake category
		this.state.talents.deleted = [];

		this.changeCategory = this.changeCategory.bind(this);
		this.updateTalent = this.updateTalent.bind(this);
		this.addTalent = this.addTalent.bind(this);
		this.removeTalent = this.removeTalent.bind(this);
		this.save = this.save.bind(this);
	}

	changeCategory(e) {
		this.setState({category: e.target.value});
	}

	updateTalent(i, data) {
		this.setState(function(state) {
			state.talents[this.state.category][i] = data;
			return {talents: state.talents};
		});
	}

	addTalent() {
		this.setState(function(state) {
			state.talents[this.state.category].push({name: 'new talent', rank: 1});
			return {talents: state.talents};
		});
	}

	removeTalent(i) {
		if(this.state.category !== 'deleted')
			this.setState(function(state) {
				state.talents.deleted.push(state.talents[this.state.category][i]);
				state.talents[this.state.category].splice(i, 1);
				return {talents: state.talents};
			});
	}

	save() {
		$.post('editor.php',{
			'category': this.state.category,
			'data': this.state.talents[this.state.category]
		});
	}

	render() {
		var talents = this.state.talents[this.state.category].map((talent, i) => {
			return <Talent {...talent} index={i} onChange={this.updateTalent} onDelete={this.removeTalent} />;
		});

		if(this.state.category !== 'deleted')
			var skills = this.props.skills[this.state.category].map(s => s.name).join(', ');

		var controls = <div id="controls">
			<select onChange={this.changeCategory} value={this.state.category}>
				<option>combat</option>
				<option>science</option>
				<option>body</option>
				<option>social</option>
				<option>spacecraft</option>
				<option>deleted</option>
			</select>
			<button className="btn btn-primary" onClick={this.save}>Save</button>
			<button className="btn btn-success" onClick={this.addTalent}>Add</button>
		</div>;

		return <div>
			<h1>Talent Editor</h1>
			{this.state.category !== 'deleted' && <div className="well">Skills: {skills}</div>}
			{controls}<div>{talents}</div>{controls}
		</div>;
	}
}

