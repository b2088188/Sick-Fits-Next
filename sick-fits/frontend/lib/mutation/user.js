function signInMutation({ email, password }) {
	return `
	mutation{
		authenticateUserWithPassword(email:"${email}",password:"${password}"){
			  ... on UserAuthenticationWithPasswordSuccess{
      item{
        id
        email
        name
      }
    }
    ... on UserAuthenticationWithPasswordFailure{
    	code
    	message
    }
		}
	}
	`;
}

function signOutMutation() {
	return `
	mutation{
		endSession
	}
	`;
}

export { signInMutation, signOutMutation };
