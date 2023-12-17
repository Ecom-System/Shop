import {
	createStyles,
	Image,
	Container,
	Title,
	Button,
	Group,
	Text,
	List,
	ThemeIcon,
  } from '@mantine/core';
  import Link from 'next/link';
  import useStyles from './styles';
import router from 'next/router';
  
  export function HeroBullets() {
	const handleShopNowClick = () => {
	  // Perform any necessary actions before navigating
  
	  // Navigate to the dashboard page
	  // Replace "dashboard" with the actual URL of your dashboard page
	  // Example: "/dashboard"
	  router.push('./dashboard')   
	  
	};
  
	return (
	  <div className="main">
		<div className="forBtn">
		  <button className="btn" onClick={handleShopNowClick}>
			Shop Now!
		  </button>
		</div>
	  </div>
	);
  }
  