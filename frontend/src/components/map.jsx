import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	ZoomControl,
	Polyline
} from "react-leaflet";
import "../styles/tailwindauto.css";
import SearchBox from "./searchBox.jsx";
import Profile from "./profile.jsx";

import { useStartCoords, useEndCoords } from "../hooks/search-hook.js"
import { useRouteButton } from "../hooks/route-hook.js";

function Map() {
	const startCoords = useStartCoords();
	const endCoords = useEndCoords();
	const routeButton = useRouteButton();

	const positions = routeButton.route.map(([lon, lat]) => [lat, lon]);

	return (
		<div className="h-screen w-screen relative">
			<MapContainer
				bounds={[
					[38.98113, -76.95163],
					[38.99774, -76.93339],
				]}
				maxBounds={[
					[38.98113, -76.95163],
					[38.99774, -76.93339],
				]}
				maxBoundsViscosity={1.0}
				minZoom={15}
				scrollWheelZoom={true}
				zoomControl={false}
				className="h-full w-full"
			>
				<TileLayer
					attribution="Made with 1000 tears"
					url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
					maxZoom={19}
				/>

				<div className="flex flex-row justify-between">
					<SearchBox 
						startCoords={startCoords}
						endCoords={endCoords}
						routeButton={routeButton}
					/>
					<Profile />
				</div>

				{positions.length > 0 && (
					<Polyline positions={positions} pathOptions={{ color: "blue" }}/>
				)}

				<Marker position={[51.505, -0.09]}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>

				<ZoomControl position="bottomright" />
			</MapContainer>
		</div>
	);
}

export default Map;
