import React from 'react';
import Collection from './collection.jsx';

class Requirement extends React.Component {
	constructor(props) {
		super(props);

		this.updateFiled = this.updateFiled.bind(this);
	}

	updateFiled(f, v) {
		let r = {...this.props, [f]: v};
		this.props.onChange({
			type: r.type,
			value: r.value,
			min: r.min|0
		});
	}

	render() {
		let options = [];

		if(this.props.type === 'attributes')
			data.attributes.forEach(a => options.push(<option key={a.id} value={a.id}>{a.name}</option>));
		else
			for(let k in data[this.props.type])
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

        this.collection = React.createRef();
		this.defaults = {
            type: 'attributes',
            value: 'Con',
            min: 1
        };
	}

	render() {
		return <div className="clearfix">
			<div className="pull-right"><button className="btn btn-success" onClick={() => this.collection.current.add()}>+</button></div>

			<Collection id={this.props.id}
						ref={this.collection}
						onChange={this.props.onChange}
						defaults={this.defaults}
						component={Requirement}
						items={this.props.requirements}/>
		</div>;
	}
}

