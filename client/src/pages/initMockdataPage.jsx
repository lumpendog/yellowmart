import React from 'react';
import useMockData from '../utils/mockData';

const InitMockdataPage = () => {
  const { status, progress, error, initialize } = useMockData();

  const handleClick = () => {
    initialize();
  };

  return (
    <div>
      <h1>Main</h1>
      <h3>Инициализация данных для firebase</h3>
      <ul>
        <li>Status: {status}</li>
        <li>Progress: {progress}%</li>
        {error && <li>{error}</li>}
      </ul>
      <button onClick={handleClick}>Иницииализировать</button>
    </div>
  );
};

export default InitMockdataPage;
