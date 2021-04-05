const IndexPage = () => {
	return null;
};

export function getServerSideProps() {
	return {
		redirect: {
			destination: '/products',
			permanent: false
		}
	};
}

export default IndexPage;
