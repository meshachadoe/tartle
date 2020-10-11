import React, { useState } from 'react';

function Editor() {
	const [code, setCode] = useState('');

	return (
		<div className='editor'>
			<h2>tartle.code</h2>
			<div className='editor-code'>
				<pre className='code-number'>
					<mark>1{'\n'}</mark>2{'\n'}3{'\n'}4{'\n'}5{'\n'}
				</pre>
				<pre contentEditable='true' className='code-text'>
					<mark>move(20){'\n'}</mark>
					turn(180){'\n'}penDown(){'\n'}move(10)
					{'\n'}turn(90){'\n'}
				</pre>
			</div>
			<button>Run</button>
		</div>
	);
}

export default Editor;
