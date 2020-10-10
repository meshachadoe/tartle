import React from 'react';

function Editor() {
	return (
		<div className='editor'>
			{/* <h2>tartle.code</h2> */}
			<div className='editor-code'>
				<pre className='code-number'></pre>
				<pre contentEditable='true' className='code-text'></pre>

				{/* {'\n'} */}
				{/* <mark>1{'\n'}</mark>2{'\n'}3{'\n'}4{'\n'}5{'\n'} */}

				{/* {'\n'} */}
				{/* <mark>move(20){'\n'}</mark> */}
				{/* turn(180){'\n'}penDown(){'\n'}move(10){'\n'}turn(90){'\n'} */}
			</div>
			<button>Run</button>
		</div>
	);
}

export default Editor;
