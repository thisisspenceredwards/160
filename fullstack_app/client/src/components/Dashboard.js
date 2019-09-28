import React from 'react';

const Dashboard = ({ name }) => {
	return (
		<div>
			<div className='white f3'>
				{`Welcome ${name}!`}
			</div>
		</div>
	);
}

export default Dashboard;