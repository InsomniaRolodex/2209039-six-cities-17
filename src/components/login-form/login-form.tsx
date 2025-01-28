import { useNavigate } from 'react-router-dom';
import { FormEvent, useRef } from 'react';
import { useAppDispatch } from '../hooks/use-app-dispatch';
import { loadOffersAsyncThunk, loginAction } from '../../store/api-actions';
import { AppRoute } from '../const';
import { toast } from 'react-toastify';

function LoginForm(): JSX.Element {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (emailRef.current && passwordRef.current) {
      dispatch(loginAction({
        email: emailRef.current.value,
        password: passwordRef.current.value
      }))
        .then((response) => {
          if (response.meta.requestStatus === 'fulfilled') {
            dispatch(loadOffersAsyncThunk);
            navigate(AppRoute.Root);
          } else {
            toast.warn('Please enter correct email and password');
          }
        });
    }
  };

  return (
    <form className='login__form form' action='#' method='post' onSubmit={handleFormSubmit}>
      <div className='login__input-wrapper form__input-wrapper'>
        <label className='visually-hidden'>E-mail</label>
        <input className='login__input form__input' type='email' name='email' placeholder='Email' required
          ref={emailRef}
          data-testid='loginElement'
        />
      </div>
      <div className='login__input-wrapper form__input-wrapper'>
        <label className='visually-hidden'>Password</label>
        <input className='login__input form__input' type='password' name='password' placeholder='Password' required
          ref={passwordRef}
          pattern='(?=.*\d)(?=.*[a-zA-Z]).*'
          title='Пароль должен содержать хотя бы одну букву и одну цифру'
          data-testid='passwordElement'
        />
      </div>
      <button className='login__submit form__submit button' type='submit'>Sign in</button>
    </form>
  );
}

export default LoginForm;
