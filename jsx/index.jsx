import ReactDOM from 'react-dom';
import React from 'react';
import TalentEditor from './talent-editor.jsx';
import ModEditor from './mod-editor.jsx';

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


