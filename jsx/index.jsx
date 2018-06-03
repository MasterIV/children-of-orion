import ReactDOM from 'react-dom';
import React from 'react';
import TalentEditor from './talent-editor.jsx';
import ModEditor from './mod-editor.jsx';
import Ship from './ship.jsx';

window.loadTalentEditor = function(data) {
	ReactDOM.render(
			<TalentEditor {...data} />,
			document.getElementById('content')
	);
};

window.loadModEditor = function(data) {
    ReactDOM.render(
		<ModEditor {...data} />,
        document.getElementById('content')
    );
};

window.loadShipEditor = function(data) {
	var ship = {};
	ReactDOM.render(
			<Ship data={data.ships} ship={ship} />,
			document.getElementById('content')
	);
};

