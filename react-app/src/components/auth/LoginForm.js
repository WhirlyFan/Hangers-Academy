import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import styles from "../cssModules/Login.module.css"

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/main/friends' />;
  }

  const registerRedirect = (e) => {
    e.preventDefault();
    history.push('/signup')
  }

  return (
    <div className={styles.loginFormBox}>
      <div id={styles.header} className={styles.welcomeText}><span>Welcome back!</span></div>
      <div id={styles.subheader} className={styles.welcomeText} ><span>We're so excited to see you again!</span></div>
      <form onSubmit={onLogin} id={styles.form}>
        <div className="errors">
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <div className={styles.labelText}>
            <label htmlFor='email'>EMAIL<span className={styles.asterisk}> *</span></label>
          </div>
          <div className={styles.inputContainer}>
            <input
              name='email'
              type='email'
              value={email}
              onChange={updateEmail}
              className={styles.inputBar}
              required
            />
        </div>
        <div>
          <div className={styles.labelText}>
            <label htmlFor='password'>PASSWORD<span className={styles.asterisk}> *</span></label>
          </div>
          <div className={styles.inputContainer}>
            <input
              name='password'
              type='password'
              value={password}
              onChange={updatePassword}
              className={styles.inputBar}
              required
            />
          </div>
          <div id={styles.buttonContainer}>
            <button type='submit' id={styles.button}>Log In</button>
          </div>
          <div id={styles.registerContainer}>
            Need an account? <span id={styles.register} onClick={registerRedirect}>Register</span>
          </div>
        </div>
          </div>
      </form>
    </div>
  );
};

export default LoginForm;
