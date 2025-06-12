
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
