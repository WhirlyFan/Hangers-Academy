import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import styles from '../cssModules/Login.module.css'

const SignUpForm = () => {
  let [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSignUp = async (e) => {
    e.preventDefault();
    // setErrors([])
    if (password !== repeatPassword) {
      setErrors(["Passwords do not match"])
    }

    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  const loginRedirect = (e) => {
    e.preventDefault();
    history.push('/login')
  }

  return (
    <div className={styles.signupFormBox}>
      <div id={styles.header} className={styles.welcomeText}>
        <span>Create an account</span>
      </div>
      <form onSubmit={onSignUp} id={styles.form}>
        <div className="errors">
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <div className={styles.labelText}>
            <label>USERNAME</label>
          </div>
          <div className={styles.inputContainer}>
            <input
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
              className={styles.inputBar}
              required
              maxLength={255}
              minLength={3}
            />
          </div>
        </div>
        <div>
          <div className={styles.labelText}>
            <label>EMAIL</label>
          </div>
          <div className={styles.inputContainer}>
            <input
              type='email'
              name='email'
              onChange={updateEmail}
              value={email}
              className={styles.inputBar}
              required
              maxLength={255}
              minLength={3}
            />
          </div>
        </div>
        <div>
          <div className={styles.labelText}>
            <label>PASSWORD</label>
          </div>
          <div className={styles.inputContainer}>
            <input
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
              className={styles.inputBar}
              maxLength={255}
              minLength={3}
              required
            />
          </div>
        </div>
        <div>
          <div className={styles.labelText}>
            <label>CONFIRM PASSWORD</label>
          </div>
          <div className={styles.inputContainer}>
            <input
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              className={styles.inputBar}
              required
              maxLength={255}
            />
        </div>
        <div id={styles.buttonContainer}>
          <button type='submit' id={styles.button}>Continue</button>
        </div>
        <div id={styles.registerContainer}>
            <span id={styles.register} onClick={loginRedirect}>Already have an account?</span>
        </div>
            </div>
      </form>
    </div>
  );
};

export default SignUpForm;
