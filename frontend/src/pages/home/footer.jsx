export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
        <div className="my-auto ml-0 sm:ml-2 md:ml-5 text-center sm:text-left">
          <h2 className="text-white text-xl logo-text">FreelanceHub</h2>
          <p className="text-gray-400 mt-2 text-sm">
            Connecting Clients & Freelancers with ease.
          </p>
        </div>

        <div className="ml-0 sm:ml-6 md:ml-15 text-center sm:text-left">
          <h3 className="text-white font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="/api/v1/freelancehub/about"
                className="hover:text-blue-400 hover:underline"
              >
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 hover:underline">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div className="ml-0 sm:ml-2 md:ml-5 text-center sm:text-left">
          <h3 className="text-white font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-blue-400 hover:underline">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 hover:underline">
                Safety
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 hover:underline">
                Community
              </a>
            </li>
          </ul>
        </div>

        <div className="text-center sm:text-left">
          <h3 className="text-white font-semibold mb-3">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-blue-400 hover:underline">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 hover:underline">
                Cookies
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 sm:pt-9 text-center text-sm text-gray-400 px-4">
        &copy;{new Date().getFullYear()} FreelanceHub. All rights reserved.
      </div>
    </footer>
  );
}
