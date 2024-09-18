// pages/visitedCity.js
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { Table, Container, Row, Col } from 'react-bootstrap';

const VisitedCity = () => {
  const [visitedCities, setVisitedCities] = useState([]);

  useEffect(() => {
    const storedCities = JSON.parse(localStorage.getItem('visitedCities')) || [];
    setVisitedCities(storedCities);
  }, []);

  return (
    <Layout>
      <Container>
        <Row className="justify-content-center mt-4">
          <Col md={8}>
            <h1 className="text-center mb-4">Visited Cities</h1>
            {visitedCities.length === 0 ? (
              <p className="text-center">No visited cities yet.</p>
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>City ID</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {visitedCities.map((cityId, index) => (
                    <tr key={cityId}>
                      <td>{index + 1}</td>
                      <td>{cityId}</td>
                      <td>
                        <Link href={`/city/${cityId}`} className="btn btn-primary btn-sm">View Weather
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default VisitedCity;
