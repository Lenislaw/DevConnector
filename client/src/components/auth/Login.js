import React, { Fragment, useState } from "react";
import { Link } from 'react-router-dom';
// import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  // const onChange = (e) => setFormData({ ...formData, name: e.target.value });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
   
  
      // const newUser = {
      //   name,
      //   email,
      //   password,
      //   password2,
      // };
      // try {
      //   const config = {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   };
      //   const body = JSON.stringify(newUser);
      //   // axios.TYP REQUESTA('ADRESS HTTP','ZAWARTOSC REQ CZYLI BODY','CONFIGURACJA')
      //   const res = await axios.post("/api/users", body, config);
      //   console.log(res.data)
      // } catch (error) {
      //   console.log(error.response.data.errors[0].msg);
      // }
      console.log("sucess");
    
  };
  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Log in
        </p>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
            />
            
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password}
              onChange={(e) => onChange(e)}
            />
          </div>
          
          <input type="submit" className="btn btn-primary" value="Log in" />
        </form>
        <p className="my-1">
          Don't have account? <Link to="/register">Sign In</Link>
        </p>
      </section>
    </Fragment>
  );
};

export default Login;
