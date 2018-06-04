import React from 'react';


export default class Item extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let item = this.props.itemDefinitions[this.props.type];
        let available = Object.values(this.props.modDefinitions)
            .filter(m => m.tags.indexOf(this.props.type) >= 0);

        let mods = Object.keys(this.props.mods).map(mod => <tr>
            <td>{mod.name}</td>
            <td>{mod.slots}</td>
            <td>1</td>
            <td><button className="btn">x</button></td>
        </tr>);

        return <div className="well item">
            <div>
                <span className="label"><strong>Name:</strong> {item.name}</span>
                <span className="label"><strong>Quality:</strong> 0</span>
                <span className="label"><strong>Costs:</strong> {item.costs}</span>
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