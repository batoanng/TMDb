import Link from 'next/link';
import style from './scss/Footer.module.scss';
import Image from 'next/image';
import { Col, Container, Navbar, Row } from 'react-bootstrap';

const Footer = () => {
	return (
		<Navbar className={style.footer}>
			<Container>
				<div className={style.footerContent}>
					<div className={style.logo}>
						<Image
							src="/footer-logo.svg"
							alt="TMDb"
							width="130"
							height="94"
						/>
						<div className={style.greeting}>Hello!</div>
					</div>
					<Row className={style.information}>
						<Col>
							<h3>THE BASICS</h3>
							<ul>
								<li>
									<Link href="/">
										<a>About TMDb</a>
									</Link>
								</li>
								<li>
									<Link href="/">
										<a>Contact Us</a>
									</Link>
								</li>
								<li>
									<Link href="/">
										<a>Support Forums</a>
									</Link>
								</li>
								<li>
									<Link href="/">
										<a>API</a>
									</Link>
								</li>
								<li>
									<Link href="/">
										<a>System Status</a>
									</Link>
								</li>
							</ul>
						</Col>
						<Col>
							<h3>GET INVOLVED</h3>
							<ul>
								<li>
									<Link href="/">
										<a>Contribution Bible</a>
									</Link>
								</li>
								<li>
									<Link href="/">
										<a>3rd Party Applications</a>
									</Link>
								</li>
								<li>
									<Link href="/">
										<a>Add New Movie</a>
									</Link>
								</li>
								<li>
									<Link href="/">
										<a>Add New TV Show</a>
									</Link>
								</li>
							</ul>
						</Col>
						<Col>
							<h3>Community</h3>
							<ul>
								<li>
									<Link href="/">
										<a>Guidelines</a>
									</Link>
								</li>
								<li>
									<Link href="/">
										<a>Discussions</a>
									</Link>
								</li>
								<li>
									<Link href="/">
										<a>Leaderboard</a>
									</Link>
								</li>
								<li>
									<Link href="/">
										<a>Twitter</a>
									</Link>
								</li>
							</ul>
						</Col>
						<Col>
							<h3>Legal</h3>
							<ul>
								<li>
									<Link href="/">
										<a>Terms of Use</a>
									</Link>
								</li>
								<li>
									<Link href="/">
										<a>API Terms of Use</a>
									</Link>
								</li>
								<li>
									<Link href="/">
										<a>Privacy Policy</a>
									</Link>
								</li>
							</ul>
						</Col>
					</Row>
				</div>
			</Container>
		</Navbar>
	);
};

export default Footer;
