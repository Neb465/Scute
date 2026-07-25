import Map from "./components/map";
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
