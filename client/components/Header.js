import style from './scss/Header.module.scss';
import Link from 'next/link';
import {
	Button,
	Container,
	Form,
	FormControl,
	Nav,
	Navbar,
	NavDropdown,
} from 'react-bootstrap';

const Header = () => {
	return (
		<Navbar
			collapseOnSelect
			expand="lg"
			className={style.header}
			variant="white"
		>
			<Container>
				<Navbar.Brand>
					<Link href="/">
						<a>
							<img
								src="/header-logo.svg"
								alt="TMDb"
								width="154"
								height="20"
							/>
						</a>
					</Link>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						<NavDropdown title="Movies">
							<NavDropdown.Item as={Button}>
								<Link href="/movies/latest">
									<a>Latest</a>
								</Link>
							</NavDropdown.Item>
							<NavDropdown.Item as={Button}>
								<Link href="/movies/popular">
									<a>Popular</a>
								</Link>
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
					<Nav className="ml-auto">
						<Nav.Link href="#deets">More deets</Nav.Link>
						<Nav.Link eventKey={2} href="#memes">
							Dank memes
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
