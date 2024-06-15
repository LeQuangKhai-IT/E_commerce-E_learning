import { FaInstagram, FaFacebook, FaTelegram } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <div className="bg-[url('https://khoinguonsangtao.vn/wp-content/uploads/2022/08/anh-nen-cong-nghe-hien-dai.jpg')] bg-left-bottom ">
        <div className=" flex justify-between mx-auto text-white px-2 md:px-20 py-5 border-b-2">
          <div className="flex flex-col space-y-4 w-48 md:w-64">
            <div className="text-xl">Logo</div>
            <p className=" text-lg text-gray-400 text-wrap">
              This is a demonstration of how different stylesheets can change
              the layout of your HTML page. You can change the layout of this
              the layout of this.
            </p>
            <div className="flex justify-start">
              <Link
                href={"https://www.facebook.com/profile.php?id=61558336769255"}
                target="_blank"
                className=" py-2 px-2 focus:outline-none"
              >
                <FaFacebook className="size-10 text-blue-500 " />
              </Link>
              <Link href={"/"} className="py-2 px-2 focus:outline-none">
                <FaTelegram className="size-10 text-blue-300 " />
              </Link>
              <Link href={"/"} className="py-2 px-2 focus:outline-none">
                <FaInstagram className="size-10 text-orange-300" />
              </Link>
            </div>
          </div>
          <div className="flex flex-col space-y-4 px-2">
            <div className="text-xl">Company</div>
            <ul>
              <li className="mb-2 text-lg hover:text-gray-300 text-gray-400">
                <Link href={"about"}>About</Link>
              </li>
              <li className="my-2 text-lg hover:text-gray-300 text-gray-400">
                <Link href={"/"}> Category</Link>
              </li>
              <li className="my-2 text-lg hover:text-gray-300 text-gray-400">
                <Link href={"blog"}>Blog</Link>
              </li>
              <li className="my-2 text-lg hover:text-gray-300 text-gray-400">
                <Link href={"contact"}>Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col space-y-4 pl-1">
            <div className="text-xl">Support</div>
            <ul>
              <li className="mb-2 text-lg hover:text-gray-300 text-gray-400">
                <Link href={"about"}>Support Center</Link>
              </li>
              <li className="my-2 text-lg hover:text-gray-300 text-gray-400">
                <Link href={"about"}>24h Service</Link>
              </li>
              <li className="my-2 text-lg hover:text-gray-300 text-gray-400">
                <Link href={"about"}>Quick Chat</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col space-y-4 pl-1">
            <div className="text-xl">Contact Us</div>
            <div className="text-sm md:text-base hover:text-blue-400 text-blue-500">
              0123-456-789
            </div>
          </div>
        </div>
        <div className="text-white text-center text-lg my-2">
          ©2024 Web khoá học Buffet
        </div>
      </div>
    </>
  );
}
