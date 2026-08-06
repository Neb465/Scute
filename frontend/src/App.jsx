import Map from "./pages/map.jsx";
import { NotFound } from "./pages/not-found.jsx";
import ResetPass from "./pages/reset-pass.jsx";
import "./styles/tailwindauto.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Map />} />
					<Route path="/resetPass" element={<ResetPass />}/>
					<Route path="*" element={<NotFound />}/>
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
