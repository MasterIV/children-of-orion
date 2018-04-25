import React from 'react';
import Talent from './talent.jsx';
import Collection from './collection.jsx';

export default class Editor extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			category: 'combat',
			talents: props.talents
		};

		// we will store deleted items in this fake category
		this.state.talents.deleted = [];
		this.collection = React.createRef();
		this.defaults = {name: 'new talent', rank: 1};

		this.changeCategory = this.changeCategory.bind(this);
		this.updateTalents = this.updateTalents.bind(this);
		this.removeTalent = this.removeTalent.bind(this);
		this.save = this.save.bind(this);
	}

	changeCategory(e) {
		this.setState({category: e.target.value});
	}

	updateTalents(data) {
        this.setState(function(state) {
        	console.log(data);
            state.talents[this.state.category] = data;
            return {talents: state.talents};
        });
	}

	removeTalent(t) {
		if(this.state.category !== 'deleted')
			this.setState(function(state) {
				state.talents.deleted.push(t);
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
		if(this.state.category !== 'deleted')
			var skills = this.props.skills[this.state.category].map(s => s.name).join(', ');

		const controls = <div id="controls">
			<select onChange={this.changeCategory} value={this.state.category}>
				<option>combat</option>
				<option>science</option>
				<option>body</option>
				<option>social</option>
				<option>spacecraft</option>
				<option>deleted</option>
			</select>
			<button className="btn btn-primary" onClick={this.save}>Save</button>
			<button className="btn btn-success" onClick={() => this.collection.current.add()}>Add</button>
		</div>;

		return <div>
			<h1>Talent Editor</h1>
			{this.state.category !== 'deleted' && <div className="well">Skills: {skills}</div>}
			{controls}
			<Collection id={'talents_'+this.state.category}
						key={'talents_'+this.state.category}
						ref={this.collection}
						onChange={this.updateTalents}
						onDelete={this.removeTalent}
						defaults={this.defaults}
						component={Talent}
						items={this.state.talents[this.state.category]}/>
			{controls}
		</div>;
	}
}

