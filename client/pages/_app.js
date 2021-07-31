import '../assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import buildClient from '../apis/build-client';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Container from 'react-bootstrap/Container';

const AppComponent = ({ Component, pageProps }) => {
	return (
		<div className="main-page">
			<Head>
				<title>TMDb</title>
				<link rel="shortcut icon" href="/favicon.ico" />
			</Head>
			<Header />
			<Component {...pageProps} />
			<Footer />
		</div>
	);
};

AppComponent.getInitialProps = async (appContext) => {
	const client = buildClient(appContext.ctx);
	let pageProps = {};
	if (appContext.Component.getInitialProps) {
		pageProps = await appContext.Component.getInitialProps(
			appContext.ctx,
			client,
		);
	}
	return {
		pageProps,
	};
};

export default AppComponent;
