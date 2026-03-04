
import React from "react";

// react icons
import { CgFacebook } from "react-icons/cg";
import { BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-slate-900 shadow-md rounded-xl w-full p-6 md:p-9">
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
                    <h3 className="text-[1.2rem] dark:text-[#abc2d3] font-semibold text-[#424242] mb-2">Join a
                        Newsletter</h3>
                    <div className="flex gap-[2px] flex-col text-[#424242] relative">
                        <label className="text-[0.9rem] dark:text-slate-400">Your Email</label>
                        <input type="email"
                            className="py-3 px-4 dark:bg-slate-900 dark:border-slate-700 dark:placeholder:text-slate-500 dark:text-[#abc2d3] w-full pr-[90px] rounded-md border border-primary outline-none"
                            placeholder="Email address" />

                        <button
                            className="px-4 h-[67%] rounded-r-md bg-[#3B9DF8] text-white absolute top-[24px] right-0">Submit
                        </button>
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
