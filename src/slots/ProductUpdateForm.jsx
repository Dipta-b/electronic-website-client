import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";

const ProductUpdateForm = () => {

    const { id } = useParams();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm();

    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState("");
    const [showModal, setShowModal] = useState(false);

    // fetch product by id
    useEffect(() => {
        const loadProduct = async () => {
            const res = await fetch(`http://localhost:5000/products/${id}`);
            const data = await res.json();

            setValue("name", data.name);
            setValue("category", data.category);
            setValue("price", data.price);
            setValue("offerPrice", data.offerPrice);
            setValue("offerEnd", data.offerEnd);
            setValue("available", data.available);
            setValue("specifications", data.specifications);
            setValue("image", data.image);

            setPreview(data.image);
        };

        loadProduct();
    }, [id, setValue]);

    // upload image
    const handleFileUpload = async (e) => {

        const file = e.target.files[0];
        if (!file) return;

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

            const hostedUrl = data.data.url;

            setValue("image", hostedUrl);
            setPreview(hostedUrl);

        } catch (err) {
            console.error(err);
        }

        setUploading(false);
    };

    const handleUrlPreview = () => {
        const url = watch("imageUrl");

        if (!url) return;

        setValue("image", url);
        setPreview(url);
    };

    // submit update
    const onSubmit = async (data) => {

        const res = await fetch(`http://localhost:5000/products/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (res.ok) {
            setShowModal(true);
        } else {
            alert(result.message || "Update failed");
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Name */}
                <div>
                    <label className="block mb-1 font-medium">Name *</label>

                    <input
                        type="text"
                        {...register("name", { required: true })}
                        className="w-full px-4 py-2 border rounded"
                    />

                    {errors.name && (
                        <p className="text-red-500 text-sm">Name required</p>
                    )}
                </div>

                {/* Image */}

                <div className="space-y-3">

                    <label className="block font-medium">Product Image *</label>

                    <input
                        type="text"
                        {...register("imageUrl")}
                        placeholder="Paste image URL"
                        className="w-full px-4 py-2 border rounded"
                    />

                    <button
                        type="button"
                        onClick={handleUrlPreview}
                        className="bg-gray-500 text-white px-3 py-1 rounded"
                    >
                        Use This URL
                    </button>

                    <div className="text-center text-gray-400">OR</div>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="w-full px-4 py-2 border rounded"
                    />

                    {uploading && <p>Uploading...</p>}

                    {preview && (
                        <img
                            src={preview}
                            className="w-32 rounded mt-2"
                        />
                    )}

                    <input
                        type="hidden"
                        {...register("image", { required: true })}
                    />

                </div>

                {/* Category */}

                <div>

                    <label className="block mb-1 font-medium">Category *</label>

                    <select
                        {...register("category", { required: true })}
                        className="w-full px-4 py-2 border rounded"
                    >

                        <option value="">Select category</option>
                        <option value="mobile">Mobile</option>
                        <option value="laptop">Laptop</option>
                        <option value="electronics">Electronics</option>
                        <option value="accessories">Accessories</option>

                    </select>

                </div>

                {/* Price */}

                <div>

                    <label className="block mb-1 font-medium">Price</label>

                    <input
                        type="number"
                        {...register("price")}
                        className="w-full px-4 py-2 border rounded"
                    />

                </div>

                {/* Offer Price */}

                <div>

                    <label className="block mb-1 font-medium">
                        Offer Price
                    </label>

                    <input
                        type="number"
                        {...register("offerPrice")}
                        className="w-full px-4 py-2 border rounded"
                    />

                </div>

                {/* Offer End */}

                <div>

                    <label className="block mb-1 font-medium">
                        Offer End
                    </label>

                    <input
                        type="datetime-local"
                        {...register("offerEnd")}
                        className="w-full px-4 py-2 border rounded"
                    />

                </div>

                {/* Specs */}

                <div>

                    <label className="block mb-1 font-medium">
                        Specifications
                    </label>

                    <textarea
                        {...register("specifications")}
                        className="w-full px-4 py-2 border rounded"
                    />

                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded"
                >
                    Update Product
                </button>

            </form>

            {/* SUCCESS MODAL */}

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40">

                    <div className="bg-white p-6 rounded shadow-lg text-center">

                        <h2 className="text-xl font-bold mb-2">
                            Product Updated Successfully
                        </h2>

                        <button
                            onClick={() => setShowModal(false)}
                            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Close
                        </button>

                    </div>

                </div>
            )}

        </div>
    );
};

export default ProductUpdateForm;