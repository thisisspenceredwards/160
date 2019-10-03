import React from 'react';

const Dashboard = ({ name }) => {
	return (
		<div>
			<div className='black f3'>
				{`Welcome ${name}!`}
			</div>
		</div>
	);
}

export default Dashboard;