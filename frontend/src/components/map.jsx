import {
	MapContainer,
	TileLayer,
	Marker,
	useMap,
	Popup,
	ZoomControl,
} from "react-leaflet";
import "../styles/map.css";
import SearchBar from "./searchbar";
import Profile from "./profile";

function Map() {
	return (
		<div className="h-screen w-screen">
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
				<div className="flex flex-row justify-between">
					<SearchBar />
					<Profile/>
				</div>
			

				<TileLayer
					attribution="Made with 1000 tears"
					url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
				/>

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
