import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    fname: "",
    mname: "",
    lname: "",
    gender: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/register", formData);
      const data = await res.data;

      if (data.error) {
        alert(data.message);
        return;
      }
      else{
        navigate('/login')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="fisrtname">
              <strong>First Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Your First Name"
              autoComplete="off"
              name="fname"
              className="form-control rounded-0"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="middlename">
              <strong>Middle Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Your Middle Name ( if applicable)"
              autoComplete="off"
              name="mname"
              className="form-control rounded-0"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastname">
              <strong>Last Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Your Last Name"
              autoComplete="off"
              name="lname"
              className="form-control rounded-0"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="gender">
              <strong>Gender</strong>
            </label>
            <input
              type="text"
              placeholder="Gender"
              autoComplete="off"
              name="gender"
              className="form-control rounded-0"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dateofbirth">
              <strong>Date Of Birth</strong>
            </label>
            <input
              type="date"
              placeholder="Date of Birth"
              autoComplete="off"
              name="dob"
              className="form-control rounded-0"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              autoComplete="off"
              name="password"
              className="form-control rounded-0"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Confirm Password</strong>
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              autoComplete="off"
              name="confirmPassword"
              className="form-control rounded-0"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Register
          </button>
        </form>
        <p>Already Have an Account?</p>
        <Link
          to="/login"
          className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
