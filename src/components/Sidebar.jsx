import SearchBar from '../components/SearchBar';
import Navbar from '../components/Navbar';
import Chats from '../components/Chats';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <SearchBar />
      <Chats />
    </div>
  );
};

export default Sidebar;
