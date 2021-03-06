import Link from "next/link";
import Nav from "./Nav";
import styled from "styled-components/macro";

const Header = () => {
	return (
		<header>
			<div
				css={`
					border-bottom: solid 10px var(--color-black, black);
					display: grid;
					grid-template-columns: auto 1fr;
					justify-content: space-between;
					align-items: center;
				`}
			>
				<h1
					css={`
						background: #f00;
						font-size: 4rem;
						margin-left: 2rem;
						position: relative;
						z-index: 2;
						transform: skew(-7deg);
					`}
				>
					<Link href="/">
						<a
							css={`
								color: #fff;
								text-decoration: none;
								text-transform: uppercase;
								padding: 0.5rem 1rem;
							`}
						>
							Sick fits
						</a>
					</Link>
				</h1>
			</div>
			<div
				css={`
					display: grid;
					grid-template-columns: 1fr auto;
					border-bottom: solid 1px var(--color-black, black);
				`}
			>
				<p>Search</p>
			</div>
			<Nav />
		</header>
	);
};

export default Header;
