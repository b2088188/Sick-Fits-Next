function getCurrentUserQuery() {
	return `
	query{
		authenticatedItem{
			... on User{
				id
				email
				name
			}
		}
	}
`;
}

export { getCurrentUserQuery };
