import React from 'react';
import sensebg from '../images/sensebg.png';
import { Link } from 'react-router-dom';
import { useProfile } from '../contextAPI/ProfileContext';
import NavDropdownMenu from './NavDropDown';

function Header() {
  const { user, logout } = useProfile();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

    return (
        <>
        <div className="m-0 w-full flex flex-col lg:flex-row items-center justify-center lg:justify-between bg-[#189f06] h-[120px] lg:h-[4rem] sticky top-0 overflow-y-visible z-[99999]">
            <div className="flex flex-row items-center justify-center lg:justify-start mt-2 lg:mt-0 lg:ml-[30px]">
                <Link to="/" className="logo-image">
                    <img src={sensebg} alt="logo" className='w-[100px] h-[40px]' />
                </Link>
                <Link to="/" className="w-fit ml-[40px]">
                    <h2 className='text-white font-[400] text-[20.8px]'>Website Directory</h2>
                </Link>
            </div>
            <div className='hidden lg:block text-white text-[17.6px] font-[400]'>
                {user.role}
            </div>
            <div className="flex flex-row items-center justify-center m-auto lg:m-0 lg:justify-start lg:mr-[30px]">
                <div className="text-white">
                {user?.role === "Admin" && (
                    <h3 className='text-white text-[17.6px] font-[400]'>{user.name}</h3>
                )}

                {user?.role === "Viewer" && (
                    <>
                    <Link to="/app/profiledetails">
                        <h3 className='text-white text-[17.6px] font-[400]'><i className="fa-regular fa-circle-user"></i> {user.name}</h3>
                    </Link>
                    </>
                )}
                </div>
                {user?.role === "Admin" && (
                <div className='px-4'>
                    <NavDropdownMenu />
                </div>
                )}
                <div className="text-white my-0 mx-[5px]">|</div>
                <button onClick={handleLogout} href="#" className="text-white bg-transparent border-none outline-none cursor-pointer">
                    <div><h3>Logout <i className='fa-solid fa-right-from-bracket text-white text-[17.6px] font-[400px]'></i></h3></div>
                </button>
            </div>
        </div>
        </>
    )
}

export default Header;