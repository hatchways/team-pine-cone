import React, { useState, useRef, useEffect } from 'react';
import { useProfileContext } from "../contexts/profile";

const AlertCenter = function() {
	const { profile } = useProfileContext();
	const player = useRef(document.getElementById("player"));
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (profile) { 
			setCount(profile.notifications.length);
			if (profile.notifications.length > count) { 
				player.current.play();
			}
		}
	}, [profile]);
	console.log(profile && profile.notifications)

	return (
		<div>
		</div>
	);
}

export default AlertCenter;
