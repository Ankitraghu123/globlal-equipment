import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FiClock, FiCreditCard, FiShield, FiTruck } from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../assets/icons/logo.png";

const Footer = () => {
    const footerLinks = [
        {
            title: "Quick Links",
            links: [
                { name: "Home", to: "/" },
                { name: "About Us", to: "/about" },
                { name: "Products", to: "/products" },
                { name: "Gallery", to: "/gallery" },
                { name: "Contact", to: "/contact" }
            ]
        },
        {
            title: "Our Products",
            links: [
                { name: "Material Handling", to: "/category/material-handling" },
                { name: "Storage Racks", to: "/category/storage-racks" },
                { name: "Plastic Pallets", to: "/category/plastic-pallets" },
                { name: "Metal Pallets", to: "/category/metal-pallets" },
                { name: "Office Furniture", to: "/category/office-furniture" }
            ]
        }
    ];

    const socialLinks = [
        { icon: <FaFacebookF size={14} />, to: "https://facebook.com", name: "Facebook" },
        { icon: <FaTwitter size={14} />, to: "https://twitter.com", name: "Twitter" },
        { icon: <FaInstagram size={14} />, to: "https://instagram.com", name: "Instagram" },
        { icon: <FaLinkedinIn size={14} />, to: "https://linkedin.com", name: "LinkedIn" },
        { icon: <FaYoutube size={14} />, to: "https://youtube.com", name: "YouTube" }
    ];

    const contactInfo = [
        { icon: <FaMapMarkerAlt className="text-yellow-400" />,
          text: "40, Sheetal Apartment, Ward No. 17, Tehsil Goharganj, District Raisen, Mandideep, Bhopal-462046, Madhya Pradesh, India" },
        { icon: <FaEnvelope className="text-yellow-400" />,
          text: "info@globalequipments.co.in",
          link: "mailto:info@globalequipments.co.in" },
        { icon: <FaPhone className="text-yellow-400" />,
          text: "+91 78693 45629",
          link: "tel:+917869345629" }
    ];

    return (
        <footer id="primary" className=" text-white">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Company Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        <Link to="/" className="inline-block">
                            <img
                                src={logo}
                                alt="Global Equipments Logo"
                                className="h-20 object-contain shadow shadow-black bg-white  p-1 rounded"
                            />
                        </Link>

                        {/* <p className="text-white  text-sm leading-relaxed">
                            Global Equipments is a leading provider of industrial equipment and material handling solutions with a commitment to quality and customer satisfaction.
                        </p> */}

                        <div className="space-y-4">
                            {contactInfo.map((item, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="mt-1">{item.icon}</div>
                                    {item.link ? (
                                        <a
                                            href={item.link}
                                            className="text-white hover:text-yellow-400 transition-colors text-lg"
                                        >
                                            {item.text}
                                        </a>
                                    ) : (
                                        <p className="text-white  text-lg">{item.text}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Footer Links Sections */}
                    {footerLinks.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="space-y-6"
                        >
                            <h3 className="text-lg font-bold text-yellow-400 uppercase tracking-wider">
                                {section.title}
                            </h3>
                            <ul className="space-y-3">
                                {section.links.map((link, linkIndex) => (
                                    <motion.li
                                        key={linkIndex}
                                        whileHover={{ x: 5 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <Link
                                            to={link.to}
                                            className="text-white  hover:text-yellow-400 transition-colors flex items-center gap-2 text-lg"
                                        >
                                            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                            {link.name}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}

                    {/* Newsletter & Social */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <h3 className="text-lg font-bold text-yellow-400 uppercase tracking-wider">
                            Newsletter
                        </h3>

                        <p className="text-white  text-lg">
                            Subscribe to our newsletter for the latest updates and offers.
                        </p>

                        <form className="space-y-3">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-3 px-4 rounded-lg transition-colors text-sm"
                            >
                                Subscribe Now
                            </button>
                        </form>

                        <div className="pt-4">
                            <h4 className="text-white  font-medium mb-3 text-sm uppercase">Follow Us</h4>
                            <div className="flex flex-wrap gap-2">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.to}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-gray-800 hover:bg-yellow-400 hover:text-gray-900 p-3 rounded-full transition-colors flex items-center justify-center"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        aria-label={social.name}
                                    >
                                        {social.icon}
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="border-t border-gray-800 bg-gray-800 py-6">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm text-center md:text-left">
                            &copy; {new Date().getFullYear()} Global Equipments. All rights reserved.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                            <Link
                                to="/privacy"
                                className="text-gray-400 hover:text-yellow-400 text-sm transition-colors"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                to="/terms"
                                className="text-gray-400 hover:text-yellow-400 text-sm transition-colors"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                to="/cookies"
                                className="text-gray-400 hover:text-yellow-400 text-sm transition-colors"
                            >
                                Cookie Policy
                            </Link>
                            <Link
                                to="/sitemap"
                                className="text-gray-400 hover:text-yellow-400 text-sm transition-colors"
                            >
                                Sitemap
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;