import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const demoLogin = () => {
    return dispatch(sessionActions.login({ credential: "FakeUser2", password: 'password3'}))
      .then(closeModal)
  }

  return (
    <div className='loginModal'>
    <>

      <h1 id= 'loginheader'>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label id='usernameinput'>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            />
        </label>
        <label id='passwordinput'>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </label>
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <button id="loginbutton" type="submit">Log In</button>
      </form>
      <button id="loginbutton" onClick={demoLogin}>Demo User</button>
    </>
        </div>
  );
}

export default LoginFormModal;