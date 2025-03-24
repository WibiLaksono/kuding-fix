"use client";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/list?q=${encodeURIComponent(searchQuery)}`);
  };

  // Menu navigasi yang akan digunakan di mobile & desktop
  const navMenus = [
    { name: "Home", link: "/" },
    { name: "All Product", link: "/list" },
    ...(user?.role === "seller" ? [{ name: "Add Product", link: "/add" }] : []),
  ];

  useEffect(() => {
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
    const token = localStorage.getItem("token");

    if (token) {
      const fetchUser = async () => {
        try {
          const res = await fetch(`${baseUrl}/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const data = await res.json();

          if (res.ok) {
            setUser(data);
          } else {
            // Jika token tidak valid, anggap user logout
            console.error("Session expired or invalid token:", data.error);
            localStorage.removeItem("token"); // Hapus token dari localStorage
            setUser(null); // Reset state user
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          localStorage.removeItem("token");
          setUser(null);
        }
      };

      fetchUser();
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const credentials = Object.fromEntries(formData);
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
    try {
      const res = await fetch(`${baseUrl}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        setUser({ email: credentials.email });
      }
      setShowLoginModal(false);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newUser = {
      username: formData.get("username"),
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      email: formData.get("email"),
      phone_number: formData.get("phone_number"),
      password: formData.get("password"), // Pastikan password dikirim
      address: formData.get("address"),
      role: formData.get("role"),
    };

    console.log("Payload yang dikirim:", newUser);

    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
    try {
      const res = await fetch(`${baseUrl}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();
      console.log("Response dari server:", data);
      if (data.users) setUser(data.users);
      setShowSignUpModal(false);
    } catch (error) {
      console.error("Sign up failed:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-20 sm:h-32 bg-white shadow-lg z-50">
      {/* Promo Bar */}
      <div className="w-full h-[20%] bg-blue-600 flex justify-center">
        <p className="text-white font-light text-xs sm:text-lg">
          LIMITED OFFER: 30% OFF. Use RABBIT30 at Checkout.
        </p>
      </div>

      {/* Mobile Mode */}
      <div className="flex justify-center w-full h-[80%] bg-white sm:hidden">
        <div className="flex flex-row justify-between items-center px-5 w-full h-full">
          {/* Logo */}
          <a href="#" className="text-red-600 text-xl font-bold font-sans">
            LOAX
          </a>

          {/* Search Bar */}
          <div className="flex flex-row justify-center items-center gap-2 w-[50%]">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value
              )}
              placeholder="ketikkan sesuatu"
              className="bg-white border border-gray-400 px-5 w-full h-10 rounded-2xl"
            />
            <button onClick={handleSearch}
              type="button"
              name="search"
              id="search"
              className="flex items-center justify-center bg-blue-300 w-16 h-8 sm:w-10 sm:h-10 rounded-full cursor-pointer"
            >
              <a className="text-black">Cari</a>
            </button>
          </div>

          {/* Hamburger Menu */}
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-20 left-0 w-full bg-white shadow-md py-3 flex flex-col items-center gap-3">
            {navMenus.map((menu, index) => (
              <a key={index} href={menu.link} className="text-gray-800 text-sm">
                {menu.name}
              </a>
            ))}
            {!user && (
              <>
                <button
                  className="text-blue-500"
                  onClick={() => setShowLoginModal(true)}
                >
                  Login
                </button>
                <button
                  className="text-blue-500"
                  onClick={() => setShowSignUpModal(true)}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Desktop Mode */}
      <div className="sm:flex flex-col w-full h-[85%] bg-white hidden">
        <div className="flex flex-row justify-between gap-16 px-10 w-full h-[65%] shadow-md">
          {/* Logo */}
          <div className="flex justify-start items-center px-2 w-[30%] h-full">
            <Link href="/" legacyBehavior>
              <a className="text-red-600 text-xl md:text-2xl font-bold font-sans">
                LOAX
              </a>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex flex-row justify-center items-center gap-2 w-[40%] h-full ">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ketikkan sesuatu"
              className="bg-white border text-gray-800 border-gray-400 px-5 w-[80%] h-[60%] rounded-2xl"
            />
            <button onClick={handleSearch}
              type="button"
              name="search"
              id="search"
              className="flex items-center text-black justify-center bg-blue-300 hover:bg-blue-400 w-[20%] h-[60%] rounded-full text-md cursor-pointer"
            >
              Cari
            </button>
          </div>

          {/* Profil dan Notifikasi */}
          <div className="flex flex-row justify-end items-center px-2 gap-2 w-[30%] h-full">
            <div className="w-[80%] h-[60%] border-r border-gray-600 flex items-center justify-end px-5">
              {user ? (
                `${user.first_name} ${user.last_name}`
              ) : (
                <div className="flex flex-row gap-5">
                  <button
                    className="text-blue-500 hover:text-blue-700 hover:border-b-2 text-sm md:text-md cursor-pointer"
                    onClick={() => setShowLoginModal(true)}
                  >
                    Login
                  </button>
                  <button
                    className="text-blue-500 hover:text-blue-700 hover:border-b-2 text-sm md:text-md cursor-pointer"
                    onClick={() => setShowSignUpModal(true)}
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
            <div className="w-[20%] h-[60%] bg-amber-200 hover:bg-amber-400 text-sm text-black flex items-center justify-center rounded-full cursor-pointer">
              Notif
            </div>
          </div>
        </div>

        {/* Menu Navigasi */}
        <div className="flex flex-row justify-center items-center gap-10 w-screen h-[35%]">
          {navMenus.map((menu, index) => (
            <a
              key={index}
              href={menu.link}
              className="text-gray-800 hover:text-gray-600"
            >
              {menu.name}
            </a>
          ))}
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setShowLoginModal(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
            <form className="space-y-3" onSubmit={handleLogin}>
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded"
                required
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="w-full p-2 border rounded"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Login
              </button>
            </form>
            <button
              onClick={() => setShowLoginModal(false)}
              className="mt-3 text-red-500 hover:text-red-700 w-full text-center"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Sign Up Modal */}
      {showSignUpModal && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setShowSignUpModal(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4 text-center">Sign Up</h2>
            <form className="space-y-3" onSubmit={handleSignUp}>
              <input
                name="username"
                type="text"
                placeholder="Username"
                className="w-full p-2 border rounded"
                required
              />
              <input
                name="first_name"
                type="text"
                placeholder="First Name"
                className="w-full p-2 border rounded"
                required
              />
              <input
                name="last_name"
                type="text"
                placeholder="Last Name"
                className="w-full p-2 border rounded"
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded"
                required
              />
              <input
                name="phone_number"
                type="text"
                placeholder="Phone Number"
                className="w-full p-2 border rounded"
                required
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="w-full p-2 border rounded"
                required
              />
              <input
                name="confirm_password"
                type="password"
                placeholder="Confirm Password"
                className="w-full p-2 border rounded"
                required
              />
              <input
                name="address"
                type="text"
                placeholder="Address"
                className="w-full p-2 border rounded"
                required
              />
              <select
                name="role"
                className="w-full p-2 border rounded"
                required
              >
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Sign Up
              </button>
            </form>
            <button
              onClick={() => setShowSignUpModal(false)}
              className="mt-3 text-red-500 hover:text-red-700 w-full text-center"
            >
              Close
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
