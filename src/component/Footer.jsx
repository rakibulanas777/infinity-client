import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai";
import { BsInstagram } from "react-icons/bs";
import { Link } from "react-router-dom";
import './Footer.css'
const Footer = () => {
  return (
    <div className="border-t-2">
      <div className="container flex items-center justify-center flex-col space-y-6 mx-auto py-6 px-10 sm:px-8 md:px-6 lg:px-10">
        <div className="footer-links text-xl text-black">
          <a href="#">About</a>
          <a href="#">Store locator</a>
          <a href="#">FAQs</a>
          <a href="#">News</a>
          <a href="#">Careers</a>
          <a href="#">Contact Us</a>
        </div>
        <p className="love text-2xl text-black">
          Design &nbsp; by{" "}
          <a
            target="_blank"
            rel="noreferrer"

            href="https://github.com/rakibulanas777"
          >
            &nbsp; Rakibul Islam Anas
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
