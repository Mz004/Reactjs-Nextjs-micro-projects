//@components/WeatherList.js
import React, { useState } from 'react';
import WeatherCard from './WeatherCard';
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const WeatherList = ({ weatherDataList }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = weatherDataList.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(weatherDataList.length / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <Row className="g-4">
        {currentCards.map((weatherData, index) => (
          <Col key={index} xs={12} md={6} lg={4}>
            <WeatherCard weatherData={weatherData} />
          </Col>
        ))}
      </Row>
      <Pagination className="justify-content-center mt-4">
        <Pagination.Prev 
          disabled={currentPage === 1} 
          onClick={() => setCurrentPage(currentPage - 1)} 
        />
        {pageNumbers.map(number => (
          <Pagination.Item 
            key={number} 
            active={number === currentPage} 
            onClick={() => paginate(number)}
          >
            {number}
          </Pagination.Item>
        ))}
        <Pagination.Next 
          disabled={currentPage === pageNumbers.length} 
          onClick={() => setCurrentPage(currentPage + 1)} 
        />
      </Pagination>
    </div>
  );
};

export default WeatherList;

