import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function SignIn({ auth }) {
	const signInWithGoogle = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider);
	};
	return (
		<>
			<button className="btn btn-dark sign-in" onClick={signInWithGoogle}>
				Sign in with Google
			</button>
		</>
	);
}
export default SignIn;
