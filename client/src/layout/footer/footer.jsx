import React from 'react';

import FacebookSvg from '../../components/common/SVGs/FacebookSvg';
import InstagramSvg from '../../components/common/SVGs/InstagramSvg';
import TwitterSvg from '../../components/common/SVGs/TwitterSvg';

import './_index.scss';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__part1">
        <h1 className="footer__h1">Contact us</h1>
        <h2 className="footer__h2">+0 977 456 89 78</h2>
        <h3 className="footer__h3">info@yellowmart.com</h3>
        <div className="footer__address">
          <p className="footer__p">101 Main St. Off. 210</p>
          <p className="footer__p">YellowStone, SF 234501</p>
          <p className="footer__p">USA</p>
        </div>
      </div>
      <div className="footer__part2">
        <h1 className="footer__h1">Contact with socials</h1>
        <div className="footer__social-icons">
          <FacebookSvg />
          <InstagramSvg />
          <TwitterSvg />
        </div>
        <h1 className="footer__h1">
          <span className="yellow">Yellow</span>Mart
        </h1>
        <p className="footer__p">Copyright &copy; 2022</p>
      </div>
    </div>
  );
};

export default Footer;
