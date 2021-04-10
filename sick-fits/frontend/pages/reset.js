import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';
import { useRouter } from 'next/router';

function ResetPage() {
	const { query } = useRouter();
	if (!query?.token)
		return (
			<div>
				<p>Sorry you must supply a token</p>
				<RequestReset />
			</div>
		);
	return (
		<div>
			<p>Reset your password</p>
			<Reset />
		</div>
	);
}

export default ResetPage;
