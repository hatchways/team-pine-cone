import { useEffect } from 'react';

export default function() {
	useEffect(() => {  
		window.scrollTo(0, 0);
	}, []);
}
