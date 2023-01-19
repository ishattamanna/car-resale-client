import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';
import { FaUserAlt } from 'react-icons/fa';
import logo from '../assets/logo.jpg'

const Header = () => {

    const { user, logOut } = useContext(AuthContext);

    const location = useLocation();

    const handleSignOut = () => {
        logOut()
            .then(() => { })
            .catch(err => {
                console.error(err);
            });
    }

    const navItems = <>
        <li><NavLink className={'font-bold lg:text-black text-xl rounded-lg lg:mr-2 mt-2 lg:mt-0'} to={'/'}>Home</NavLink></li>
        <li><NavLink className={'font-bold lg:text-black text-xl rounded-lg lg:mr-2 mt-2 lg:mt-0'} to={'/blog'}>Blog</NavLink></li>
        {
            user?.uid ?
                <>
                    <li><NavLink className={'font-bold lg:text-black text-xl rounded-lg lg:mr-2 mt-2 lg:mt-0'} to={'/dashboard'}>Dashboard </NavLink></li>
                    <li><button onClick={handleSignOut} className={'btn  font-bold text-xl rounded-lg lg:mr-2 mt-2 lg:mt-0'}>Sign Out</button></li>
                </>
                :
                <li><NavLink className={'font-bold lg:text-black text-xl rounded-lg lg:mr-2 mt-2 lg:mt-0'} to={'/signin'}>Sign In</NavLink></li>
        }
    </>


    return (
        <div className="navbar bg-violet-400 px-2 py-5">
            <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    {
                        navItems
                    }
                </ul>
            </div>
            <div className="navbar-start">
                <NavLink to={'/'} className="btn btn-ghost normal-case lg:text-xl font-bold">
                    <img className='lg:w-[60px] w-[30px] h-[30px] lg:h-[60px] rounded-full' src={logo} alt="" />
                </NavLink>
            </div>
            <button className={`btn btn-primary lg:hidden ${location.pathname.includes('/dashboard') ? 'block' : 'hidden'}`}>
                <label htmlFor="dashboardDrawer" className={`drawer-button`}>Nevigate</label>
            </button>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {
                        navItems
                    }
                </ul>
            </div>
            {
                user?.uid ?

                    <div className='navbar-end'>
                        <p className='text-black font-bold lg:text-xl mr-5 hidden lg:block'>{user.displayName}</p>
                        {
                            user?.photoURL ?
                                <div className="avatar mr-2 tooltip tooltip-left" data-tip={user?.displayName}>
                                    <div className="lg:w-16 w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img alt='' src={user.photoURL} />
                                    </div>
                                </div>
                                :
                                <FaUserAlt className="text-gray-900 mr-2 text-5xl rounded-full text-end"></FaUserAlt>
                        }
                    </div>
                    :
                    <div className="navbar-end">
                        <NavLink to={'/signup'} className="btn btn-outline text-black font-bold">Get started</NavLink>
                    </div>
            }

        </div>
    );
};

export default Header;