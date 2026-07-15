import {
	MapContainer,
	TileLayer,
	Marker,
	useMap,
	Popup,
	ZoomControl,
} from "react-leaflet";
import "../styles/tailwindauto.css";
import SearchBox from "./searchBox.jsx";
import Profile from "./profile.jsx";

function Map() {
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
					<SearchBox />
					<Profile />
				</div>

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
