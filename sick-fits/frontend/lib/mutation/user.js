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

function signUpMutation({ email, name, password }) {
	return `
	mutation{
		createUser(data:{email:"${email}",name:"${name}",password:"${password}"}){
			id
			email
			name
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

export { signInMutation, signOutMutation, signUpMutation };
