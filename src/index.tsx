import React from 'react';
import ReactDOM from 'react-dom';
import './theme/index.css';
import App from './App';
import AppProvider from './providers';

ReactDOM.render(
	<React.StrictMode>
		<AppProvider>
			<App />
		</AppProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
