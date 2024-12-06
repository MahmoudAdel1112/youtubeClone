import { NavLink } from 'react-router-dom';
import { SearchBar } from '../SearchBar/SearchBar';

export const Navbar = () => {
    return (
        <div className="w-full h-16 bg-black flex justify-between px-5 items-center sticky top-0 left-0 right-0 z-50 shadow-md">
            <NavLink to="/" className="h-full flex items-center">
                <img 
                    src="https://i.ibb.co/s9Qys2j/logo.png" 
                    alt="site logo" 
                    className="h-5/6"
                />
            </NavLink>
            <SearchBar />
        </div>
    );
};
