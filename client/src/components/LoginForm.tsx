import { observer } from 'mobx-react-lite';
import { FC, useState, useContext } from 'react';
import { Context } from '../index';

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { store } = useContext(Context);

  return (
    <div>
      <input
        type="text"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={e => store.registration(email, password)}>
        Register
      </button>
      <button onClick={e => store.login(email, password)}>Log in</button>
    </div>
  );
};

export default observer(LoginForm);
