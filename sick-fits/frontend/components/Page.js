import PropTypes from "prop-types";
const Page = ({ children }) => {
	return (
		<div>
			<h2>I am the Page component</h2>
			{children}
		</div>
	);
};

export default Page;

Page.propTypes = {
	cool: PropTypes.string,
	children: PropTypes.any,
};
