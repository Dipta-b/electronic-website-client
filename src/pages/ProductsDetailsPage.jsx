import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// react icons
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FiCpu, FiSmartphone } from "react-icons/fi";
import { IoMdCamera } from "react-icons/io";
import { MdBatteryChargingFull } from "react-icons/md";
import { GoVerified } from "react-icons/go";
import { IoStorefrontOutline } from "react-icons/io5";
import { CiDeliveryTruck } from "react-icons/ci";
import { useCart } from "./shared/CartContext";

const ProductDetailsPage = () => {
    const { addToCart } = useCart();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedStorage, setSelectedStorage] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5000/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setSelectedColor(data?.colors?.[0] || null);
                setSelectedStorage(data?.storage?.[0] || null);
            })
            .catch(err => console.error(err));
    }, [id]);

    if (!product) return <p className="text-center py-10">Loading...</p>;

    const images = product.images?.length ? product.images : [product.image];

    return (
        <div className="mx-auto md:px-8 md:py-12">
            <div className="w-full grid grid-cols-2 md:grid-cols-2 gap-6">

                {/* Left side - Image gallery */}
                <div className="flex flex-col flex-col-reverse gap-4">
                    {/* Thumbnails */}
                    <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 w-20">
                        {images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`w-20 h-20 border-2 rounded-lg overflow-hidden ${selectedImage === index
                                    ? "border-[#0FABCA]"
                                    : "border-transparent dark:border-slate-700"
                                    }`}
                            >
                                <img
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="object-cover w-full h-full"
                                />
                            </button>
                        ))}
                    </div>

                    {/* Main image */}
                    <div className="flex-1 flex items-center justify-center bg-gray-100 dark:bg-slate-900 rounded-lg p-4">
                        <img
                            src={images[selectedImage]}
                            alt={`Main ${selectedImage + 1}`}
                            className="object-contain max-h-[600px] w-full md:w-auto rounded-lg"
                        />
                    </div>
                </div>

                {/* Right side - Product details */}
                <div className="flex flex-col gap-6">
                    <div>
                        <h1 className="text-[1.6rem] dark:text-[#abc2d3] md:text-[1.9rem] font-bold text-gray-800">{product.name}</h1>
                        <div className="flex items-center gap-2 mt-2 md:mt-5">
                            <span className="text-3xl dark:text-[#abc2d3] font-medium">${product.price}</span>
                            {product.offerPrice && <span className="text-xl dark:text-slate-400 text-gray-500 line-through">${product.originalPrice}</span>}
                        </div>
                    </div>

                    {/* Color selection */}
                    {product.colors?.length > 0 && (
                        <div className="flex float-start md:items-center flex-col md:flex-row gap-[10px]">
                            <label className="text-sm dark:text-[#abc2d3] font-medium">Select color:</label>
                            <div className="flex gap-3">
                                {product.colors.map(color => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        className={`w-8 h-8 rounded-full border ${selectedColor === color ? "ring-2 dark:ring-offset-slate-800 ring-offset-2 ring-[#0FABCA]" : ""}`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Storage selection */}
                    {product.storage?.length > 0 && (
                        <div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {product.storage.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedStorage(size)}
                                        className={`py-2 px-4 rounded-lg border ${selectedStorage === size ? "border-[#0FABCA] bg-[#0FABCA]/10 text-[#0FABCA]" : "border-gray-200 dark:border-slate-700 dark:text-[#abc2d3]"}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Specifications */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Spec icon={<FiSmartphone />} label="Screen size" value={product.screen} />
                        <Spec icon={<FiCpu />} label="CPU" value={product.cpu} />
                        <Spec icon={<IoMdCamera />} label="Camera" value={product.camera} />
                        <Spec icon={<MdBatteryChargingFull />} label="Battery" value={product.battery} />
                    </div>

                    <p className="text-[0.9rem] dark:text-slate-400 text-gray-600">{product.description}</p>

                    {/* Action buttons */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <button
                            onClick={() => setIsFavorite(!isFavorite)}
                            className="flex-1 py-3 px-4 dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-900 rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-50"
                        >
                            <div className="flex items-center justify-center gap-2">
                                {isFavorite ? <BsHeartFill className="w-5 h-5 text-red-500" /> : <BsHeart className="w-5 h-5" />}
                                Add to Wishlist
                            </div>
                        </button>
                        <button onClick={() => addToCart(product, 1)} className="flex-1 py-3 px-4 rounded-lg bg-[#0FABCA] text-white hover:bg-[#0FABCA]/90">Add to Cart</button>
                    </div>

                    {/* Delivery info */}
                    <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between mt-2">
                        <Info icon={<CiDeliveryTruck />} title="Free Delivery" sub="1-2 day" />
                        <Info icon={<IoStorefrontOutline />} title="In Stock" sub="Today" />
                        <Info icon={<GoVerified />} title="Guaranteed" sub="1 year" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const Spec = ({ icon, label, value }) => (
    <div className="flex items-center gap-2 dark:bg-slate-900 bg-gray-50 p-3 rounded-lg">
        {icon}
        <div>
            <p className="text-sm dark:text-[#abc2d3] text-gray-500">{label}</p>
            <p className="font-medium text-gray-700 dark:text-slate-400 text-[0.9rem]">{value}</p>
        </div>
    </div>
);

const Info = ({ icon, title, sub }) => (
    <div className="flex items-center gap-3">
        <div className="text-[3rem] dark:bg-slate-900 dark:text-[#abc2d3] text-gray-500 p-3 bg-gray-100 rounded-md">{icon}</div>
        <div>
            <p className="text-sm dark:text-[#abc2d3] text-gray-500">{title}</p>
            <p className="font-medium text-[0.9rem] dark:text-slate-500 text-gray-800">{sub}</p>
        </div>
    </div>
);

export default ProductDetailsPage;