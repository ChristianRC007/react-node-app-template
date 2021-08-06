import { observer } from 'mobx-react-lite';
import { useEffect, useContext, useState, FC } from 'react';
import { Context } from './index';
import LoginForm from './components/LoginForm';
import { IUser } from './models/IUser';
import UserService from './services/UserService';

const App: FC = () => {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, []);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  if (store.isLoading) {
    return <div>Loading...</div>;
  }

  if (!store.isAuth) {
    return <LoginForm />;
  }

  return (
    <div className="App">
      <h1>
        {store.isAuth ? `User is authorized ${store.user.email}` : 'AUTHORIZE'}
      </h1>
      <h1>
        {store.user.isActivated
          ? 'Account is activated'
          : 'Activate your account!!!'}
      </h1>
      <button onClick={() => store.logout()}>Log out</button>
      <div>
        <button onClick={getUsers}>Get users</button>
        {users.map(user => (
          <div key={user.email}>{user.email}</div>
        ))}
      </div>
    </div>
  );
};

export default observer(App);
