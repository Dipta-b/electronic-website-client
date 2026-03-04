import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import bangladeshShops from "../data/shop.json";

// Fix marker icon issue with Leaflet + React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

function ShopMap() {
    const [shops, setShops] = useState([]);

    useEffect(() => {
        if (bangladeshShops?.divisions) {
            const allShops = bangladeshShops.divisions.flatMap((div) =>
                div.districts?.flatMap((dist) => dist.shops ?? []) ?? []
            );
            setShops(allShops);
        }
    }, []);

    return (
        <div>
            <h1>All Shops: {shops.length}</h1>

            <MapContainer
                center={[23.685, 90.356]} // center of Bangladesh
                zoom={7}
                style={{ height: "500px", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                {shops.map((shop, index) => (
                    <Marker key={index} position={[shop.lat, shop.lng]}>
                        <Popup>
                            <strong>{shop.name}</strong>
                            <br />
                            {shop.address}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default ShopMap;