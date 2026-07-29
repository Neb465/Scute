import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	ZoomControl,
	Polyline,
} from "react-leaflet";
import SearchBox from "../components/search-box.jsx";
import Profile from "../components/profile.jsx";
import { useRoute } from "../hooks/route-hook.js";
import { useProfile } from "../hooks/profile-hook.js";
import PathInfo from "../components/path-info.jsx";
import CreateAccountBox from "../components/create-account.jsx";
import LoginBox from "../components/login.jsx";
import { useProfileStore } from "../stores/useProfileStore.js";

function Map() {
	const routeButton = useRoute();
	const profileCreateAcc = useProfileStore((state) => state["profile"].createAcc);
	const profileLogin = useProfileStore((state) => state["profile"].login)

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
				className="h-full w-full z-0"
			>
				<TileLayer
					attribution="Made with 1000 tears"
					url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
					maxZoom={19}
				/>

				<div className="flex flex-row justify-between">
					<SearchBox getRoute={routeButton.getRoute} isError={routeButton.isError} error={routeButton.error}/>
					<Profile />
				</div>

				{profileCreateAcc && <CreateAccountBox />}
				{profileLogin && <LoginBox />}

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

						<PathInfo routeButton={routeButton}/>
					</>
				)}

			</MapContainer>
		</div>
	);
}

export default Map;
