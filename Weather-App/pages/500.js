// pages/500.js
import Link from 'next/link';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Custom500 = () => {
  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1 className="display-1">500</h1>
          <p className="lead">Oops! Something went wrong on our end.</p>
          <Link href="/" passHref>
            <Button variant="primary">Go Home</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Custom500;
