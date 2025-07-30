import React from 'react';
import { ShoppingBag, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-8 w-8 text-orange-500" />
              <h3 className="text-2xl font-bold">
                YOUR<span className="text-orange-500">Store</span>
              </h3>
            </div>
            <p className="text-gray-400">
              YOUR STORE DESCRIPTION HERE. 
              Customize this text to describe your affiliate business.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Categories</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Best Deals</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">New Arrivals</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Returns</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange-500" />
                <span className="text-gray-400">support@affiliatestore.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-500" />
                <span className="text-gray-400">1-800-123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-orange-500" />
                <span className="text-gray-400">123 Business St, City, State 12345</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 AffiliateStore. All rights reserved. 
            <span className="block mt-2 text-sm">
              As an Amazon Associate, we earn from qualifying purchases.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;