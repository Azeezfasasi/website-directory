import Header from '../assets/component/Header';
import { useProfile } from '../assets/contextAPI/ProfileContext';

const Dashboard = () => {
  const { user, logout } = useProfile();

  return (
    <>
    <Header />
    <div>
      <h1>Welcome, {user?.name}</h1>
      <button onClick={logout}>Logout</button>
    </div>
    </>
  );
};

export default Dashboard;
