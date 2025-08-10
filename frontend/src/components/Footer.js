import React, { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing, ${email}!`);
      setEmail("");
    }
  };

  return (
    <footer className="bg-gray-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="bg-gray-700 p-8 rounded-lg flex flex-col md:flex-row justify-between items-center text-center md:text-left mb-16">
          <div>
            <h3 className="text-2xl font-bold">
              Receive exclusive offers in your mailbox
            </h3>
          </div>
          <form
            onSubmit={handleSubscribe}
            className="flex mt-4 md:mt-0 w-full md:w-auto"
          >
            <input
              type="email"
              placeholder="Enter Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full md:w-80 px-4 py-2 rounded-l-md text-gray-800 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-brand-yellow text-gray-900 font-semibold px-6 py-2 rounded-r-md"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-500 text-sm">
          <p>All rights Reserved Your Company, 2025</p>
          <p className="mt-2">Made with ♥ by Themewagon</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
