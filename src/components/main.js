import React from 'react';
import Button from './button';
import Editor from './editor';
import Canvas from './canvas';
import '../scss/main.scss';
import '../scss/button.scss';

function Main() {
	return (
		<div className='main'>
			<Button />
			<Editor />
			<Canvas />
		</div>
	);
}

export default Main;
