import React from "react";
import "../Styles/Footer.css";
import { Link } from "react-router-dom";
import Logo from "../Assets/Logo/LogoForBonnitaaa.jpg";

const Footer = () => {
  return (
    <div className="FooterBgColor d-md-block d-none">
      <div className="">
        <div className="row ps-md-5 pe-md-5">
          <div className="col-md-4 d-flex justify-content-center gap-4 mx-auto my-auto">
          <div>
            <p className="pt-lg-4">+91-0000000000</p>
            <p className="mt-3">example@gmail.com</p>
            <p className="mt-3">
              No: 123, Abc st, Mckingston<br/> main road Chennai - 118.
            </p>
            <div class="wrp mt-md-3">
              <Link to="" class="icon icon-twitter">
                <i class="fa fa-twitter"></i>
              </Link>
              <Link to="" class="icon icon-facebook">
                <i class="fa fa-facebook"></i>
              </Link>
              <Link to="" class="icon icon-instagram">
                <i class="fa fa-instagram"></i>
              </Link>
            </div>
          </div>
          </div>
          <div className="col-md-4 d-flex flex-column justify-content-center align-items-center">
          <div>

            <img src={Logo} alt="#" className="img-fluid" />
          </div>
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.0619303638346!2d80.17701997557!3d13.031728213556148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5260d62bc6942b%3A0x8cd23707b2ddfb87!2sSRM%20Easwari%20Engineering%20College!5e0!3m2!1sen!2sin!4v1697561664496!5m2!1sen!2sin"
              width="420"
              height="180"
              className="mt-4 d-lg-block d-md-none d-block "
              style={{ border: "0" ,borderRadius:"20px"}}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="col-md-4 d-flex justify-content-center gap-4 mt-md-0 mt-4 mx-auto my-auto">
            <div>
            <p className="mb-3">
            Products
            </p>
            <p className="mb-3">
            Sign Up
            </p>
            <p className="mb-3">Who we are</p>
            <p className="mb-3">My Cart</p>
            </div>
            <div className="">
              <p className="mb-3">Privacy Policy</p>
              <p className="mb-3">Terms & Conditions</p>
              <p className="mb-3">Return & Refund Policy</p>
              <p className="mb-3"> Sign In</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
