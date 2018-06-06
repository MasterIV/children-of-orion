import React from 'react';
import range from './range.jsx';

export default class Character extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let attrHeads = this.props.attributes.map(attr => <th>{attr.id}</th>);
		let attrValues = this.props.attributes.map(attr => <th><input className="input-mini" type="number"/></th>);

		return <div>
			<table className="table">
				<tbody>
					<tr>
						<th>Name:</th>
						<td></td>
						<th>Initiative:</th>
						<td></td>
					</tr>
					<tr>
						<th>Gender:</th>
						<td></td>
						<th>Pysical hitpoints:</th>
						<td></td>
					</tr>
					<tr>
						<th>Race:</th>
						<td></td>
						<th>Mental hitpoints:</th>
						<td></td>
					</tr>
				</tbody>
			</table>

			<table className="table">
				<thead>{attrHeads}</thead>
				<tbody>{attrValues}</tbody>
			</table>
		</div>;
	}
}