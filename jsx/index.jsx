import ReactDOM from 'react-dom';
import React from 'react';
import Editor from './editor.jsx';

window.loadEditor = function(data) {
	ReactDOM.render(
			<Editor {...data} />,
			document.getElementById('content')
	);
};

