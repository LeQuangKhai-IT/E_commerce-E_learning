"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import { TiArrowSortedDown } from "react-icons/ti";
import { MdMenu, MdClose } from "react-icons/md";
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { logout } from "@/redux/auth/authSlice";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { accessToken, role, email, lname } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());

    router.push("/");
  };
  const search = () => {
    alert("Search");
  };

  return (
    <>
      <div className="bg-[url('https://khoinguonsangtao.vn/wp-content/uploads/2022/08/anh-nen-cong-nghe-hien-dai.jpg')] py-4">
        <div className="mx-auto flex justify-between items-center px-10">
          <div className="flex items-center space-x-4 md:space-x-8">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Logo
            </Link>
            <div className="lg:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                {isMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
              </button>
            </div>
            <div className="group relative">
              <button className=" text-white rounded-full">
                <div className="hidden lg:flex items-center px-1 text-lg">
                  <BiCategory size={"22px"} className="mx-1.5" /> Category
                  <TiArrowSortedDown className="mt-1" />
                </div>
              </button>
              <nav className="bg-white invisible border-gray-800 rounded w-36 absolute right-0 top-full transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-4">
                <ul className="py-1">
                  <li>
                    <a
                      href="#"
                      className="block text-center px-4 py-2 hover:bg-blue-300"
                    >
                      Category
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block text-center px-4 py-2 hover:bg-blue-300"
                    >
                      Category
                    </a>
                  </li>
                  <li>
                    <div className="block text-center px-4 py-2 hover:bg-blue-300">
                      Category
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
            <Link
              href="/about"
              className="hidden lg:flex text-lg text-white hover:text-gray-300 no-underline"
            >
              About
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="Search..."
              className="flex min-[832px]:w-72  border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-44"
            />
            <button
              className="text-white hover:text-gray-300 focus:outline-none"
              onClick={() => search()}
            >
              <FiSearch size={20} />
            </button>
          </div>

          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <Link
                href="/cart"
                className="text-white hover:text-gray-300 focus:outline-none"
              >
                <FiShoppingCart size={24} />
              </Link>
              <span className="size-5 bg-red-600 rounded-full text-white text-center mb-6">
                3
              </span>
            </div>
            {accessToken ? (
              <>
                <div className="group relative">
                  <button className="bg-gray-800 text-white rounded-full">
                    <img
                      className="size-9 rounded-full"
                      src="https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-21.jpg"
                    ></img>
                  </button>
                  <nav className="bg-white invisible border-gray-800 rounded w-auto absolute right-0 top-full transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1">
                    <ul className="py-1">
                      <li>
                        <a
                          href="#"
                          className="block text-center px-4 py-2 hover:bg-gray-300"
                        >
                          <div className="flex-col py-1">
                            <div className="font-bold">{lname}</div>
                            <span className="text-sm">{email}</span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block text-center px-4 py-2 hover:bg-gray-300"
                        >
                          Profile
                        </a>
                      </li>

                      {role && role === "admin" && (
                        <li>
                          <a
                            href="#"
                            className="block text-center px-4 py-2 hover:bg-gray-300"
                          >
                            Dashboard
                          </a>
                        </li>
                      )}
                      <li>
                        <a
                          href="#"
                          className="block text-center px-4 py-2 hover:bg-gray-300"
                        >
                          Setting
                        </a>
                      </li>
                      <li>
                        <div
                          onClick={handleLogout}
                          className="block text-center px-4 py-2 hover:bg-gray-300"
                        >
                          Logout
                        </div>
                      </li>
                    </ul>
                  </nav>
                </div>
              </>
            ) : (
              <>
                {" "}
                <Link
                  href="/sign-in"
                  className="bg-blue-500 text-lg text-white px-3 py-2 rounded-md hover:bg-blue-600 no-underline "
                >
                  Login
                </Link>
                <Link
                  href="/sign-up"
                  className="flex bg-green-500 text-lg text-white px-3 py-2 rounded-md hover:bg-green-600 no-underline"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="flex flex-col items-center space-y-4 mt-4">
              <div className="group relative">
                <button className="flex text-white rounded-full">
                  <div className="flex items-center px-1 text-lg">
                    <BiCategory size={"22px"} className="mx-1.5" /> Category
                    <TiArrowSortedDown className="mt-1" />
                  </div>
                </button>
                <nav className="bg-white invisible border-gray-800 rounded w-36 absolute right-0 top-full transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-4">
                  <ul className="py-1">
                    <li>
                      <a
                        href="#"
                        className="block text-center px-4 py-2 hover:bg-blue-300"
                      >
                        Category
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block text-center px-4 py-2 hover:bg-blue-300"
                      >
                        Category
                      </a>
                    </li>
                    <li>
                      <div className="block text-center px-4 py-2 hover:bg-blue-300">
                        Category
                      </div>
                    </li>
                  </ul>
                </nav>
              </div>
              <Link
                href="/about"
                className="flex text-white hover:text-gray-300 no-underline"
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
