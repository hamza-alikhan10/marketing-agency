
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="text-xl font-bold text-gray-800">RobinHood</span>
          </div>
          
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Earn RH Coin by sharing your unused internet bandwidth. 
            Secure, transparent, and rewarding.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 text-sm">Platform</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/" className="hover:underline hover:text-gray-800">Dashboard</Link></li>
                <li><Link to="/how-it-works" className="hover:underline hover:text-gray-800">How It Works</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3 text-sm">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:underline hover:text-gray-800">About Us</a></li>
                <li><a href="#" className="hover:underline hover:text-gray-800">Terms of Service</a></li>
                <li><a href="#" className="hover:underline hover:text-gray-800">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3 text-sm">Connect</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:underline hover:text-gray-800">Telegram</a></li>
                <li><a href="#" className="hover:underline hover:text-gray-800">Discord</a></li>
                <li><a href="#" className="hover:underline hover:text-gray-800">Twitter</a></li>
                <li><a href="#" className="hover:underline hover:text-gray-800">Medium</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 space-y-2">
            <p className="text-xs text-gray-600">
              &copy; 2025 RobinHood Crypto Investment Platform. All rights reserved.
            </p>
            <p className="text-xs text-gray-600">
              Investment involves risk. Please invest responsibly.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
