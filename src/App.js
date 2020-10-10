import React from 'react';
import Navbar from './components/navbar';
import Main from './components/main';
import './scss/App.scss';

function App() {
	return (
		<div className='App'>
			<Navbar />
			<Main />
		</div>
	);
}

export default App;
