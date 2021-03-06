import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import CustomLink from '../components/CustomLink';
import auth from '../firebase.init';
import Loading from './Loading';

const Navbar = () => {
    const [user, loading] = useAuthState(auth);
    const menu = <>
        <li><CustomLink to={'/home'}>Home</CustomLink></li>
        {
            user && <li><CustomLink to={'/dashboard'}>Dashboard</CustomLink></li>
        }
        <li><CustomLink to={'/portfolio'}>Portfolio</CustomLink></li>
        <li><CustomLink to={'/blog'}>Blog</CustomLink></li>
        <li>
            {
                user
                    ?
                    <CustomLink to="/login" className="py-2 pr-4 pl-3 text-red-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent flex items-center" onClick={(e) => {
                        signOut(auth);
                        localStorage.removeItem('accessToken');
                    }} title={`${user?.displayName}`}>
                        {
                            user?.photoURL && <img src={user?.photoURL} alt="dp" className='rounded-full w-8 mr-2 object-cover' />
                        }
                        Logout ({user?.displayName?.split(' ')[0]}...)</CustomLink>
                    :
                    <CustomLink to="/login" className="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</CustomLink>
            }
        </li>
    </>

    if (loading) {
        return <Loading />
    }

    return (
        <div className='bg-base-200 sticky top-0 z-50 shadow'>
            <div className="navbar justify-between container mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex="0" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {menu}
                        </ul>
                    </div>
                    <Link to={'/home'} className="btn btn-ghost normal-case text-xl flex items-center">
                        <i className="fa fa-superpowers mr-1 text-primary text-4xl" aria-hidden="true"></i>
                        <span className='text-secondary'>Hammer Power</span>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        {menu}
                    </ul>
                </div>
                <div>
                    <div className="navbar-end lg:hidden">
                        <label htmlFor="dashboard-drawer" tabIndex="1" className="btn btn-ghost lg:hidden">
                            <i className="fa fa-tachometer text-xl" aria-hidden="true"></i>
                        </label>
                    </div>
                    <div className="navbar-end lg:hidden">
                        <label htmlFor="portfolio-drawer" tabIndex="1" className="btn btn-ghost lg:hidden">
                            <i className="fa fa-cogs" aria-hidden="true"></i>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;