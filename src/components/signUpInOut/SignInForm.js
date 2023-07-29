import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../features/authSlice';

function SignInForm() {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    dispatch(signIn(email, password));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Password" />
      <button type="submit">Sign In</button>
      {error && <div>{error}</div>}
    </form>
  );
}

export default SignInForm;
