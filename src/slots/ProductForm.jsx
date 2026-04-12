import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ProductForm = () => {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        defaultValues: { available: true }
    });

    const [message, setMessage] = useState("");
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState("");

    const handleFileUpload = async (e) => {
        if (!e?.target?.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        setUploading(true);

        try {
            const formData = new FormData();
            formData.append("image", file);

            const res = await fetch(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
                {
                    method: "POST",
                    body: formData
                }
            );

            const data = await res.json();
            if (!data.success) throw new Error("Upload failed");

            const hostedUrl = data.data.url;

            setValue("image", hostedUrl);
            setPreview(hostedUrl);

        } catch (err) {
            console.error(err);
            alert("Image upload failed");
        } finally {
            setUploading(false);
        }
    };

    const handleUrlPreview = () => {
        const url = watch("imageUrl");
        if (!url) return;

        setValue("image", url);
        setPreview(url);
    };

    const onSubmit = async (data) => {
        try {
            const res = await fetch(`${import.meta.env.DEV ? "http://localhost:5000" : "https://electronic-website-server.vercel.app"}/products`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Failed to add product");

            setMessage("✅ Product added successfully!");
        } catch (err) {
            console.error(err);
            setMessage(err.message || "Error submitting product.");
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            {message && <p className="mb-4 text-center text-green-500">{message}</p>}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div>
                    <label className="block mb-1 font-medium">Name *</label>
                    <input type="text" {...register("name", { required: true })}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Product name" />
                    {errors.name && <p className="text-red-500 text-sm mt-1">Name is required</p>}
                </div>

                {/* Image Section */}
                <div className="space-y-3">
                    <label className="block font-medium">Product Image *</label>

                    {/* URL Input */}
                    <input
                        type="text"
                        {...register("imageUrl")}
                        placeholder="Paste image URL"
                        className="w-full px-4 py-2 border rounded"
                    />

                    <button
                        type="button"
                        onClick={handleUrlPreview}
                        className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                    >
                        Use This URL
                    </button>

                    <div className="text-center text-gray-400">OR</div>

                    {/* File Upload */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="w-full px-4 py-2 border rounded"
                    />

                    {uploading && (
                        <p className="text-blue-500 text-sm">Uploading...</p>
                    )}

                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            className="mt-3 w-32 rounded shadow"
                        />
                    )}

                    {/* Hidden Final Image Field */}
                    <input
                        type="hidden"
                        {...register("image", { required: true })}
                    />

                    {errors.image && (
                        <p className="text-red-500 text-sm">
                            Product image is required
                        </p>
                    )}
                </div>

                {/* Category */}
                <div>
                    <label className="block mb-1 font-medium">Category *</label>
                    <select {...register("category", { required: true })}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select category</option>
                        <option value="mobile">Mobile</option>
                        <option value="laptop">Laptop</option>
                        <option value="electronics">Electronics</option>
                        <option value="accessories">Accessories</option>
                    </select>
                    {errors.category && <p className="text-red-500 text-sm mt-1">Category is required</p>}
                </div>

                {/* Availability */}
                <div className="flex items-center gap-2">
                    <input type="checkbox" {...register("available")} defaultChecked id="available" />
                    <label htmlFor="available" className="font-medium">Available</label>
                </div>

                {/* Price */}
                <div>
                    <label className="block mb-1 font-medium">Price</label>
                    <input type="number" {...register("price")}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Price in USD" />
                </div>

                {/* Offer Price */}
                <div>
                    <label className="block mb-1 font-medium">Offer Price (optional)</label>
                    <input type="number" {...register("offerPrice")}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Discounted price" />
                </div>

                {/* Offer End Time */}
                <div>
                    <label className="block mb-1 font-medium">Offer End Time (optional)</label>
                    <input type="datetime-local" {...register("offerEnd")}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                {/* Additional Specs */}
                <div>
                    <label className="block mb-1 font-medium">Additional Specs (optional)</label>
                    <textarea {...register("specifications")}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Any other details..." rows={4} />
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors duration-300">
                    Submit Product
                </button>
            </form>
        </div>
    );
};

export default ProductForm;