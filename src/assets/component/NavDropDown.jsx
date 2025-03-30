import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon } from 'lucide-react';

const NavDropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 border border-solid border-blue-600 text-white px-2 py-1 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
      >
        Menu <ChevronDownIcon className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg animate-fadeIn z-[9999]">
          <ul className="py-2">
            <li>
              <Link to="/app/home" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Website Directory</Link>
            </li>
            <li>
              <Link to="/app/tenantcategorylists" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Website Categories</Link>
            </li>
            <li>
              <Link to="/app/addtenantcategory" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Add a Website Category</Link>
            </li>
            <li>
              <Link to="/app/tenantLists" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Website Types</Link>
            </li>
            <li>
              <Link to="/app/addtenant" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Add Website Type</Link>
            </li>
            <li>
              <Link to="/app/tenantapps" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">All Apps</Link>
            </li>
            <li>
              <Link to="/app/addtenantapp" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Create Apps</Link>
            </li>
            <li>
              <Link to="" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</Link>
            </li>
            <li>
              <Link to="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Settings</Link>
            </li>
            <li>
              <Link to="/logout" className="block px-4 py-2 text-red-600 hover:bg-gray-100">Logout</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavDropdownMenu;
