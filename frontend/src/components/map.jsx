import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	ZoomControl,
	Polyline,
} from "react-leaflet";
import SearchBox from "./search-box.jsx";
import Profile from "./profile.jsx";
import { useRouteButton } from "../hooks/route-hook.js";
import { useSearch } from "../hooks/search-hook.js";
import PathInfo from "./path-info.jsx";

function Map() {
	const routeButton = useRouteButton();
	const startSearch = useSearch();
	const endSearch = useSearch();

	const positions = routeButton.route
		? routeButton.route.map(([lon, lat]) => [lat, lon])
		: [];

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
					<SearchBox routeButton={routeButton} startSearch={startSearch} endSearch={endSearch}/>
					<Profile />
				</div>

				{positions.length > 0 && (
					<>
						<Polyline
							positions={positions}
							pathOptions={{ color: "blue", weight: "7" }}
						/>

						<Marker position={positions[0]}>
							<Popup>Start</Popup>
						</Marker>

						<Marker position={positions[positions.length - 1]}>
							<Popup>Goal</Popup>
						</Marker>
					</>
				)}

				<PathInfo routeButton={routeButton} startSearch={startSearch} endSearch={endSearch}/>

				<ZoomControl position="bottomright" />
			</MapContainer>
		</div>
	);
}

export default Map;
