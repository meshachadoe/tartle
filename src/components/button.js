import React from 'react';
import '../scss/button.scss';

function Button() {
	return (
		<div className='button-group'>
			<button>
				<img src={require('../img/info.svg')}></img>
			</button>
			<button>
				<img src={require('../img/example1.svg')}></img>
			</button>
			<button>
				<img src={require('../img/example2.svg')}></img>
			</button>
			<button>
				<img src={require('../img/example3.svg')}></img>
			</button>
		</div>
	);
}

export default Button;
