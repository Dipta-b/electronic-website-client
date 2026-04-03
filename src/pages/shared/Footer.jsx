
import React from "react";

// react icons
import { CgFacebook } from "react-icons/cg";
import { BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-[#0B1121] premium-shadow rounded-[32px] w-[96%] mx-auto my-10 p-10 md:p-14 border border-slate-100 dark:border-slate-800/60">
            <div className="flex justify-between gap-[30px] flex-wrap w-full">

                <div className="">
                    <h3 className="text-[1.2rem] dark:text-[#abc2d3] font-semibold text-[#424242] mb-2">Services</h3>
                    <div className="flex text-black flex-col gap-[10px]">
                        <p className="text-[0.9rem] dark:text-slate-400 text-[#424242] hover:text-[#3B9DF8] cursor-pointer transition-all duration-200">UI
                            Components</p>
                        <p className="text-[0.9rem] dark:text-slate-400 text-[#424242] hover:text-[#3B9DF8] cursor-pointer transition-all duration-200">Website
                            Templates</p>
                        <p className="text-[0.9rem] dark:text-slate-400 text-[#424242] hover:text-[#3B9DF8] cursor-pointer transition-all duration-200">Icons</p>
                        <p className="text-[0.9rem] dark:text-slate-400 text-[#424242] hover:text-[#3B9DF8] cursor-pointer transition-all duration-200">Opacity
                            Palette</p>
                        <p className="text-[0.9rem] dark:text-slate-400 text-[#424242] hover:text-[#3B9DF8] cursor-pointer transition-all duration-200">Blocks</p>
                    </div>
                </div>


                <div>
                    <h3 className="text-[1.2rem] dark:text-[#abc2d3] font-semibold text-[#424242] mb-2">Company</h3>
                    <div className="flex text-black flex-col gap-[10px]">
                        <p className="text-[0.9rem] dark:text-slate-400 text-[#424242] hover:text-[#3B9DF8] cursor-pointer transition-all duration-200">Service</p>
                        <p className="text-[0.9rem] dark:text-slate-400 text-[#424242] hover:text-[#3B9DF8] cursor-pointer transition-all duration-200">Features</p>
                        <p className="text-[0.9rem] dark:text-slate-400 text-[#424242] hover:text-[#3B9DF8] cursor-pointer transition-all duration-200">Our
                            Team</p>
                        <p className="text-[0.9rem] dark:text-slate-400 text-[#424242] hover:text-[#3B9DF8] cursor-pointer transition-all duration-200">Portfolio</p>
                        <p className="text-[0.9rem] dark:text-slate-400 text-[#424242] hover:text-[#3B9DF8] cursor-pointer transition-all duration-200">Blog</p>
                        <p className="text-[0.9rem] dark:text-slate-400 text-[#424242] hover:text-[#3B9DF8] cursor-pointer transition-all duration-200">Contact
                            Us</p>
                    </div>
                </div>


                <div>
                    <h3 className="text-[1.2rem] dark:text-[#abc2d3] font-semibold text-[#424242] mb-2">Our Social Media</h3>
                    <div className="flex text-black flex-col gap-[10px]">
                        <p className="text-[0.9rem] dark:text-slate-400 text-[#424242] hover:text-[#3B9DF8] cursor-pointer transition-all duration-200">Dribbble</p>
                        <p className="text-[0.9rem] dark:text-slate-400 text-[#424242] hover:text-[#3B9DF8] cursor-pointer transition-all duration-200">Behance</p>
                        <p className="text-[0.9rem] dark:text-slate-400 text-[#424242] hover:text-[#3B9DF8] cursor-pointer transition-all duration-200">Medium</p>
                        <p className="text-[0.9rem] dark:text-slate-400 text-[#424242] hover:text-[#3B9DF8] cursor-pointer transition-all duration-200">Instagram</p>
                        <p className="text-[0.9rem] dark:text-slate-400 text-[#424242] hover:text-[#3B9DF8] cursor-pointer transition-all duration-200">Facebook</p>
                        <p className="text-[0.9rem] dark:text-slate-400 text-[#424242] hover:text-[#3B9DF8] cursor-pointer transition-all duration-200">Twitter</p>
                    </div>
                </div>

                <div>
                    <h3 className="text-[1.2rem] dark:text-[#abc2d3] font-semibold text-[#424242] mb-4">Join our Newsletter</h3>
                    <div className="flex gap-[2px] flex-col text-[#424242] relative">
                        <label className="text-sm dark:text-slate-400 font-medium mb-1">Stay updated with the latest tech:</label>
                        <div className="relative flex items-center">
                            <input type="email"
                                className="py-3 px-5 dark:bg-slate-800/80 dark:border-slate-700 dark:placeholder:text-slate-500 dark:text-[#abc2d3] w-full rounded-full border border-slate-200 outline-none focus:border-[#38bdf8] focus:ring-[3px] focus:ring-[#38bdf8]/15 premium-inner-shadow transition-all duration-300"
                                placeholder="Enter your email address" />

                            <button
                                className="absolute right-1.5 h-[80%] px-5 rounded-full bg-linear-to-r from-[#0ea5e9] to-[#2563eb] text-white font-semibold hover:shadow-[0_4px_12px_rgba(14,165,233,0.3)] hover:scale-105 transition-all duration-300"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="border-t border-gray-200 dark:border-slate-700 pt-[20px] mt-[40px] flex items-center justify-between w-full flex-wrap gap-[20px]">
                <img src="https://i.ibb.co/ZHYQ04D/footer-logo.png" alt="logo"
                    className="w-[130px]" />

                <p className="text-[0.9rem] text-gray-600 dark:text-slate-500">© 2024 ZenUI Library. All Rights
                    Reserved. </p>

                <div className="flex items-center gap-[10px] text-[#424242]">
                    <a className="text-[1.3rem] p-1.5 cursor-pointer rounded-full hover:text-white hover:bg-[#3B9DF8] dark:text-slate-400 transition-all duration-300">
                        <CgFacebook />
                    </a>
                    <a className="text-[1.2rem] p-1.5 cursor-pointer rounded-full hover:text-white hover:bg-[#3B9DF8] dark:text-slate-400 transition-all duration-300">
                        <BsTwitter />
                    </a>
                    <a className="text-[1.2rem] p-1.5 cursor-pointer rounded-full hover:text-white hover:bg-[#3B9DF8] dark:text-slate-400 transition-all duration-300">
                        <BsInstagram />
                    </a>
                    <a className="text-[1.2rem] p-1.5 cursor-pointer rounded-full hover:text-white hover:bg-[#3B9DF8] dark:text-slate-400 transition-all duration-300">
                        <BsLinkedin />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
