import React from 'react';

const tags = ['melee', 'thrown', 'archaic', 'ballistic', 'beam', 'heavy', 'armor'];

export default class Mod extends React.Component {
    constructor(props) {
        super(props);

        this.tags = {};
        tags.forEach(tag => this.tags[tag] = props.tags.indexOf(tag)>=0);

        this.updateFiled = this.updateFiled.bind(this);
        this.toggleTag = this.toggleTag.bind(this);
    }

    updateFiled(k, v) {
        let data = {...this.props, [k]: v};
        this.props.onChange({
            id: data.id,
            name: data.name,
            description: data.description,
            slots: data.slots | 0,
            max: data.max | 0,
            tags: data.tags
        });
    }

    toggleTag(tag) {
        this.tags[tag] = !this.tags[tag];
        this.updateFiled('tags', tags.filter(t => this.tags[t]));
    }

    render() {
        let checkboxes = tags.map(tag => <label
            key={tag+'_'+this.props.index}
            htmlFor={tag+'_'+this.props.index}
            className="badge badge-info">

            {tag} <input type="checkbox"
                         id={tag+'_'+this.props.index}
                         checked={this.tags[tag]}
                         onChange={() => this.toggleTag(tag)}/>
        </label>);

        return <div className="well talent form-inline">
            <div className="pull-right">
                <button className="btn btn-danger" onClick={() => this.props.onDelete(this.props.index)}>X</button>
            </div>

            <div>
                <input type="text" value={this.props.name}
                       onChange={e => this.updateFiled('name', e.target.value)}/>

                <label htmlFor={'rank_'+this.props.index}>Quality:</label>
                <input id={'rank_'+this.props.index}
                       className="input-mini"
                       type="number"
                       value={this.props.slots}
                       onChange={e => this.updateFiled('slots', e.target.value)}/>

                <label htmlFor={'max_'+this.props.index}>Max:</label>
                <input id={'max_'+this.props.index}
                       className="input-mini"
                       type="number"
                       value={this.props.max}
                       onChange={e => this.updateFiled('max', e.target.value)}/>
            </div>

            <div>
				<textarea onChange={e => this.updateFiled('description', e.target.value)}
                          className="description" value={this.props.description} />
            </div>

            <div>{checkboxes}</div>
        </div>;

    }
}