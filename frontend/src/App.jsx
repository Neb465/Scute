import Map from "./pages/map.jsx";
import "./styles/tailwindauto.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Map />
		</QueryClientProvider>
	);
}

export default App;
