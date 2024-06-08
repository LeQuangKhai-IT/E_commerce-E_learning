"use client";
import Link from "next/link";
import { useState } from "react";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { MdMenu, MdClose } from "react-icons/md";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const search = () => {
    alert("Search");
  };

  return (
    <nav className="bg-slate-800 shadow-md py-4">
      <div className="mx-auto flex justify-between items-center px-10">
        <div className="flex items-center space-x-4 md:space-x-8">
          <Link href="/" className="text-xl font-bold text-blue-600">
            Logo
          </Link>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              Category
            </button>
            {isDropdownOpen && (
              <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-md z-10">
                <Link
                  href="/category1"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 no-underline"
                >
                  Category 1
                </Link>
                <Link
                  href="/category2"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 no-underline"
                >
                  Category 2
                </Link>
                <Link
                  href="/category3"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 no-underline"
                >
                  Category 3
                </Link>
              </div>
            )}
          </div>
          <Link
            href="/about"
            className="text-white hover:text-gray-300 no-underline"
          >
            About
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-3">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
          />
          <button
            className="text-white hover:text-gray-300 focus:outline-none"
            onClick={() => search()}
          >
            <FiSearch size={20} />
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/cart"
            className="text-white hover:text-gray-300 focus:outline-none pr-5"
          >
            <FiShoppingCart size={24} />
          </Link>
          <Link
            href="/sign-in"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 no-underline "
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 no-underline"
          >
            Sign Up
          </Link>
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            {isMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="flex flex-col items-center space-y-4 mt-4">
            <div className="flex items-center space-x-3">
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="text-gray-700 hover:text-gray-900 focus:outline-none">
                <FiSearch size={20} />
              </button>
            </div>
            <Link
              href="/cart"
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              <FiShoppingCart size={24} />
            </Link>
            <Link
              href="/sign-in"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 no-underline"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 no-underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
