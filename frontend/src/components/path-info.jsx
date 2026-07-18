const PathInfo = ({ routeButton, startSearch, endSearch }) => {
	return (
		<div className="fixed bg-white flex flex-col items-center justify-center px-3 py-2 min-h-30 md:min-h-35 lg:min-h-40 min-w-35 md:min-w-45 lg:min-w-55 max-w-60 md:max-w-72 lg:max-w-80 rounded-lg bottom-4 left-6 z-1000">
			<p className="py-2">Start location: <span className="text-blue-700">{startSearch.finalQuery}</span></p>
			<p className="py-2">End location: <span className="text-blue-700">{endSearch.finalQuery}</span></p>
			<p className="py-2">Distance/Time: {}</p>
		</div>
	);
};

export default PathInfo;
