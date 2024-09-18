//@components/Layout.js
import { useContext } from 'react';
import Link from 'next/link';
import { Navbar, Nav, FormGroup, FormControl, Button, Dropdown, DropdownButton, Container, Row, Col } from 'react-bootstrap';
import { UnitContext } from '@/context/UnitContext';
import { LanguageContext } from '@/context/LanguageContext';
import { CityIdContext } from '@/context/CityIdContext';

const Layout = ({ children }) => {
  const { unit, setUnit } = useContext(UnitContext);
  const { language, setLanguage } = useContext(LanguageContext);
  const { cityId, setCityId } = useContext(CityIdContext);

  const updateCityId = (e) => setCityId(e.target.value);

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    console.log(`Language changed to ${lang}`);
  };

  return (
    <>
      <Navbar bg="dark" expand="lg" className="mb-4">
        <Container fluid>
          <Row className="w-100">
            <Col xs="auto" className="d-flex align-items-center text-white">
              <Navbar.Brand className="text-white font-weight-bold" href="/">Weather App</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link className="text-white" href="/visitedCity">Visited City</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Col>
            <Col xs="auto" className="mx-auto">
              <Navbar.Collapse id="basic-navbar-nav">
                <FormGroup className="d-flex ml-auto">
                  <FormControl
                    type="text"
                    placeholder="City ID"
                    value={cityId}
                    onChange={updateCityId}
                    required
                  />
                  <Link href={`/city/${cityId}`} passHref>
                    <Button variant="outline-light" className="ml-2">Search</Button>
                  </Link>
                </FormGroup>
              </Navbar.Collapse>
            </Col>
            <Col xs="auto" className="d-flex justify-content-end align-items-center">
              <Navbar.Collapse id="basic-navbar-nav">
                <DropdownButton id="dropdown-basic-button" title="Language" className="mr-2">
                  <Dropdown.Item onClick={() => handleLanguageChange('en')}>English</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleLanguageChange('es')}>Spanish</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleLanguageChange('fr')}>French</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleLanguageChange('de')}>German</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleLanguageChange('nl')}>Dutch</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleLanguageChange('hi')}>Hindi</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleLanguageChange('ar')}>Arabic</Dropdown.Item>
                </DropdownButton>
              </Navbar.Collapse>
            </Col>
            <Col xs="auto" className="d-flex justify-content-end align-items-center">
              <Navbar.Collapse id="basic-navbar-nav">
                <Button variant="light" onClick={toggleUnit}>
                  {unit === 'metric' ? 'Switch to Fahrenheit' : 'Switch to Celsius'}
                </Button>
              </Navbar.Collapse>
            </Col>
          </Row>
        </Container>
      </Navbar>
      <div className="container">
        {children}
      </div>
    </>
  );
};

export default Layout;
