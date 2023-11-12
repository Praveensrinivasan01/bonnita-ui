import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../../Styles/LandingPage/Queries.css";

const ContactUs = () => {
  const [feedBacks, setFeedBacks] = useState();

  const [name, setname] = useState("");
  const [mobile, setphonenumber] = useState("");
  const [email, setemail] = useState("");
  const [query, setqueryType] = useState("");
  const [comments, setcomments] = useState("");

  const handleQueries = async (e) => {
    e.preventDefault();

    if (!name || !mobile || !email || !query || !comments) {
      toast("Please fill in all the required fields.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/landingpage/post-query`,
        {
          name,
          mobile,
          email,
          query,
          comments,
        }
      );
      localStorage.setItem(
        "responseAtQueryStatusCode",
        response.data.statusCode
      );
      if (response?.data?.statusCode === 200) {
        toast("Your query has been received. We will contact you back.");
      } else {
        toast(
          "There was an issue submitting your query. Please try again later."
        );
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div className="container pt-52">
      <h3>
        <Link to="/" className="text-gray-400">
          Home
        </Link>
        /Contact
      </h3>

      <div className="pt-5">
        <h1 className="md:text-3xl text-xl font-bold">Contact Us</h1>
        <p className="pt-1">
          If you need any help, please contact us or send us an email or go to
          our forum.
        </p>
        <p className="pt-1">
          We are sure that you can receive our reply as soon as possible.
        </p>
        <div className=" grid grid-rows-3 grid-flow-col gap-4 pt-10 divide-x-2 text-center">
          <div className="row-span-2">
            <p className="font-bold">Phone</p>
            <p className="text-gray-500 pt-2">
              <span>Phone 01:</span>
              <Link to=""> (0091) 8547 632521</Link>
            </p>
          </div>
          <div className="row-span-2 ">
            <p className="font-bold">ADDRESS</p>
            <p className="text-gray-500 pt-2">
              <Link>69 Halsey St, New York, Ny 10002, United States.</Link>
            </p>
          </div>
          <div className="row-span-2">
            <p className="font-bold ">EMAIL</p>
            <p className="text-gray-500 pt-2">
              <span></span>

              <Link to=""> bonnita@gmail.com</Link>
            </p>
          </div>
        </div>
      </div>
      <h1 className="font-bold md:text-3xl pt-3">Get In Touch With Us</h1>
      <p className=" text-gray-800 pt-3">
        If you have any question, Please don’t hesitate to send us a me
      </p>
      <div
        className=" pt-md-5"
        name="contact"
        style={{ zIndex: 1, position: "relative" }}
      >
        <div className="container my-5 bgForm">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-6">
              <form onSubmit={handleQueries}>
                <div className="row g-3">
                  <div className="form-floating mb-3 col-md-6">
                    <input
                      type="text"
                      className="form-control rounded-0 border-top-0 border-start-0 border-end-0 text-light"
                      // id="your-name"
                      placeholder="name@example.com"
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                    />
                    <label htmlFor="your-name" className="lable text-light">
                      Name
                    </label>
                  </div>
                  <div className="form-floating mb-3 col-md-6">
                    <input
                      type="text"
                      className="form-control rounded-0 border-top-0 border-start-0 border-end-0 text-light"
                      // id="your-phone"
                      placeholder="PhoneNumber"
                      value={mobile}
                      onChange={(e) => setphonenumber(e.target.value)}
                    />
                    <label htmlFor="your-phone" className="lable text-light">
                      Phone No
                    </label>
                  </div>
                  <div className="form-floating mb-3 col-md-6">
                    <input
                      type="email"
                      className="form-control rounded-0 border-top-0 border-start-0 border-end-0 text-light"
                      // id="your-email"
                      placeholder="email"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                    />
                    <label htmlFor="your-email" className="lable text-light">
                      E-mail Address
                    </label>
                  </div>
                  <div className="form-floating mb-3 col-md-6">
                    <input
                      type="text"
                      className="form-control rounded-0 border-top-0 border-start-0 border-end-0 text-light"
                      // id="query-type"
                      placeholder="Type Your Query"
                      value={query}
                      onChange={(e) => setqueryType(e.target.value)}
                    />
                    <label htmlFor="query-type" className="lable  text-light">
                      Type of Query
                    </label>
                  </div>
                  <div className="form-floating mb-3 col-12">
                    <textarea
                      className="form-control rounded-0 border-top-0 border-start-0 border-end-0 text-light"
                      placeholder="Leave a comment here"
                      // id="your-comments"
                      style={{ height: "100px" }}
                      value={comments}
                      onChange={(e) => setcomments(e.target.value)}
                    ></textarea>
                    <label htmlFor="your-comments" className="lable text-light">
                      Comments
                    </label>
                  </div>
                  <div className="text-center pb-3">
                    <button
                      type="submit"
                      className="btn button rounded-0 fw-bold ps-5 pe-5 text-light "
                    >
                      Send
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <iframe
        title="Google Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.0619303638346!2d80.17701997557!3d13.031728213556148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5260d62bc6942b%3A0x8cd23707b2ddfb87!2sSRM%20Easwari%20Engineering%20College!5e0!3m2!1sen!2sin!4v1697561664496!5m2!1sen!2sin"
        width="100%"
        height="500"
        className="mt-4 d-lg-block d-md-none d-block mb-4"
        style={{ border: "0", borderRadius: "20px" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default ContactUs;
