// pages/404.js
import Link from 'next/link';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Custom404 = () => {
  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1 className="display-1">404</h1>
          <p className="lead">Sorry, the page you are looking for could not be found.</p>
          <Link href="/" passHref>
            <Button variant="primary">Go Home</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Custom404;
