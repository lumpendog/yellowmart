import React from 'react';
import history from '../../../utils/history';
import Button from '../../common/button';

const Advertising = () => {
  const handleShopNow = () => {
    history.push('/catalog');
  };
  return (
    <>
      <div className="intro-left">
        <div className="intro-1">
          <Button size="sm" content="Shop now" onClick={handleShopNow} />
        </div>
        <div className="intro-2">
          <Button size="sm" content="Shop now" onClick={handleShopNow} />
        </div>
      </div>
      <div className="intro-right">
        <div className="intro-3">
          <Button size="sm" content="Shop now" onClick={handleShopNow} />
        </div>
      </div>
    </>
  );
};

export default Advertising;
