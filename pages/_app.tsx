import '../styles/globals.css'
import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app'
import Layout from 'src/components/layout'
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

export default function App({ Component, pageProps }: AppProps) {

	const [ssr, setSsr] = useState(true);
	useEffect(() => {
		setSsr(false);
	  },[]);
	
	if(ssr === true) {
		return null;
	}
	else {
		return <MantineProvider withNormalizeCSS withGlobalStyles>
		<NotificationsProvider>
			<Layout> <Component {...pageProps} /></Layout>
		</NotificationsProvider>
	</MantineProvider>
	}
}


// import '../styles/globals.css'
// import type { AppProps } from 'next/app'
// import Layout from 'src/components/layout'

// export default function App({ Component, pageProps }: AppProps) {
// 	return <Layout> <Component {...pageProps} /></Layout>
// }