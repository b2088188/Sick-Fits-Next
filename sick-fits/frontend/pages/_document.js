import Document, { Html, Head, NextScript, Main } from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
	static getInitialProps({ renderPage }) {
		const sheet = new ServerStyleSheet();
		// Go through every component that needs be rendered,
		// see if it has styled components.
		const page = renderPage((App) => (props) =>
			sheet.collectStyles(<App {...props} />)
		);
		// Gathering all styles into tags.
		const styleTags = sheet.getStyleElement();
		return { ...page, styleTags };
	}

	render() {
		return (
			<Html lang="en-CA">
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
