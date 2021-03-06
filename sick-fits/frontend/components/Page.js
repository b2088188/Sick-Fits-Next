import PropTypes from "prop-types";
import Header from "./Header";
import styled from "styled-components/macro";
const Page = ({ children }) => {
	return (
		<div>
			<Header />
			<div
				css={`
					max-width: var(--maxWidth);
					margin: 0 auto;
					padding: 2rem;
				`}
			>
				{children}
			</div>
		</div>
	);
};

export default Page;

Page.propTypes = {
	cool: PropTypes.string,
	children: PropTypes.any,
};
