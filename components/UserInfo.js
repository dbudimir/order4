import { useContext } from 'react';
import UserContext from './UserContext';

const UserInfo = () => {
  const { userName, signOut } = useContext(UserContext);

  return (
    <div className="user-info">
      <p>
        Hello, <strong>{userName}</strong>
      </p>
      <p>Welcome to our app</p>
      <button type="button" className="button" onClick={signOut}>
        Sign Out
      </button>
    </div>
  );
};

export default UserInfo;
