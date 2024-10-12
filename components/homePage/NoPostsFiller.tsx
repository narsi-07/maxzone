import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image component
import VerificationBadge from '../VerificationBadge';

function NoPostsFiller() {
  return (
    <div className="slider-container">
      <div className="slider">
        <div className="swiper people__slide">
          <div className="swiper-wrapper">

            {/* First Slide */}
            <div className="swiper-slide">
              <div className="people__card">
                <div className="people__image">
                  <Image
                    src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEilxyO1qVTv5gmAWkpwuQZBBAMYk6xjqCXZ93jKlK1N9e3i2b57tMDWS3OQVA8ViAxQtgwsO1F1AqeX9MWo0owTh7jUpGjHyiCkLsdB3jvLtAYJkAHm72D3AQb19YYA2vXqDR6l0EI8dpHWCcCmFtL8fNsokWePH-S6LyHMn3ruRKUA17TaDN3lcphv4vw/s320/narsi.jpg"
                    alt="Narsi Jangid"
                    width={320}
                    height={320}
                    layout="responsive" // Use responsive layout
                  />
                </div>
                <div className="people__info">
                  <ul className="people__social">
                    <li><a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f" /></a></li>
                    <li><a href="#" aria-label="Twitter"><i className="fa-brands fa-twitter" /></a></li>
                    <li><a href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in" /></a></li>
                  </ul>
                  <h3 className="people__name">Narsi Jangid <VerificationBadge /></h3>
                  <p className="people__position">Co-founder and CEO</p>
                  <p className="people__desc">Narsi Jangid, Dazzlone's CEO, drives innovative strategies for unparalleled success.</p>
                </div>
                <div className="people__btn">
                  <Link href="/narsijangid" passHref>
                    <a>Follow</a>
                  </Link>
                </div>
              </div>
            </div>

            {/* Second Slide */}
            <div className="swiper-slide">
              <div className="people__card">
                <div className="people__image">
                  <Image
                    src="https://blogger.googleusercontent.com/img/a/AVvXsEizRzmsA6-km8m8PvXZo5iKjG7OLdg-5UlA9hnI4-dwb7f6vnn08Uya9NdYmDSQA89ADx7cSNUHF0PrS5utIA69O2jM1AjzIcBMEJTV5JtCzD4TbZKa0fOWemAKq0A8RrMfsOtSguXhuV0SoYbyFpKqi9plizkhDPR0EOstV_CZnKaAijaPge7musXE2oY"
                    alt="Dazzlone"
                    width={320}
                    height={320}
                    layout="responsive"
                  />
                </div>
                <div className="people__info">
                  <ul className="people__social">
                    <li><a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f" /></a></li>
                    <li><a href="#" aria-label="Twitter"><i className="fa-brands fa-twitter" /></a></li>
                    <li><a href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in" /></a></li>
                  </ul>
                  <h3 className="people__name">Dazzlone <VerificationBadge /></h3>
                  <p className="people__position">Official Account</p>
                </div>
                <div className="people__btn">
                  <Link href="/dazzlone" passHref>
                    <a>Follow</a>
                  </Link>
                </div>
              </div>
            </div>

            {/* Third Slide */}
            <div className="swiper-slide">
              <div className="people__card">
                <div className="people__image">
                  <Image
                    src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Free4Talk"
                    width={320}
                    height={320}
                    layout="responsive"
                  />
                </div>
                <div className="people__info">
                  <ul className="people__social">
                    <li><a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f" /></a></li>
                    <li><a href="#" aria-label="Twitter"><i className="fa-brands fa-twitter" /></a></li>
                    <li><a href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in" /></a></li>
                  </ul>
                  <h3 className="people__name">Free4Talk <VerificationBadge /></h3>
                  <p className="people__position">social Support</p>
                  <p className="people__desc">The biggest social network in the world.</p>
                </div>
                <div className="people__btn">
                  <Link href="/free4talk" passHref>
                    <a>Follow</a>
                  </Link>
                </div>
              </div>
            </div>

            {/* Add more slides as needed... */}

          </div>
        </div>
      </div>
    </div>
  );
}

export default NoPostsFiller;
