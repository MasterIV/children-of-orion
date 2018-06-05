import React from 'react';
import range from './range.jsx';

export default class Item extends React.Component {
    constructor(props) {
        super(props);

        this.available = Object.values(props.modDefinitions).filter(m => m.tags.indexOf(props.type) >= 0);
        this.state = { selected: this.available[0].id }
    }

    update(s, v) {
        let mods = {...this.props.mods};
        if(v === 0) delete mods[s];
        else mods[s] = v || mods[s] || 1;

        let item = this.props.itemDefinitions[this.props.type];
        let q = Object.keys(mods).reduce((a, c) => a + this.props.modDefinitions[c].slots * mods[c], 0);

        let e = Object.keys(mods).reduce((a, c) => a + this.props.modDefinitions[c].energy | 0, 0);
        // let d = Object.keys(mods).reduce((a, c) => a + this.props.modDefinitions[c].damage | 0, 0);
        // let s = Object.keys(mods).reduce((a, c) => a + this.props.modDefinitions[c].speed | 0, 0);

        this.props.onChange({
            type: this.props.type,
            quality: q,
            costs: Math.round( this.props.qualities[q] * item.costs ),
            energy: item.energy + e,
            // damage: item.damage + d,
            // speed: item.speed + s,
            mods: mods
        });
    }

    render() {
        let item = this.props.itemDefinitions[this.props.type];

        let mods = Object.keys(this.props.mods).map(mod => <tr key={mod}>
            <td>{this.props.modDefinitions[mod].name}</td>
            <td>{this.props.modDefinitions[mod].slots}</td>
            <td>{this.props.modDefinitions[mod].max > 1 ? <select name="amount"
                                     onChange={e => this.update(mod, e.target.value|0)}
                                     className="amount input-mini">{range(1, this.props.modDefinitions[mod].max).map(i =>
                <option key={i}>{i}</option>)}</select> : 1}</td>
            <td><button className="btn btn-danger" onClick={e => this.update(mod, 0)}>x</button></td>
        </tr>);

        return <div className="well item">
            <div className="input-append hidden-print pull-right">
                <select id="add-system" onChange={e => this.setState({selected: e.target.value})}>
                    {this.available.map(s => <option value={s.id} key={s.id}>{s.name}</option>)}
                </select>

                <button className="btn btn-default" type="button" onClick={e => this.update(this.state.selected)}>Add</button>
                <button className="btn btn-danger" type="button" onClick={this.props.onDelete}>x</button>
            </div>

            <div>
                <span className="label"><strong>Name:</strong> {item.name}</span>
                <span className="label"><strong>Quality:</strong> {this.props.quality}</span>
                <span className="label"><strong>Costs:</strong> {this.props.costs}</span>
                {this.props.energy ? <span className="label"><strong>Energy:</strong> {this.props.energy}</span> : ''}
                {this.props.damage ? <span className="label"><strong>Damage:</strong> {this.props.damage}</span> : ''}
                {this.props.speed ? <span className="label"><strong>Speed:</strong> {this.props.speed}</span> : ''}
                {this.props.children}
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Quality</th>
                        <th>Amount</th>
                        <th> </th>
                    </tr>
                </thead>

                <tbody>
                    {mods}
                </tbody>
            </table>
        </div>;
    }
}