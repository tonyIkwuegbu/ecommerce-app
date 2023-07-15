import "./App.css";
import { Route, Routes } from "react-router-dom";
import Pages from "./pages/Pages";
import Data from "./components/DummyData";
import SData from "./components/TopDealsData";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cart from "./common/Cart/Cart";
import RootLayout from "./RootLayout";
import Men from "./pages/men";

function App() {
	//Step 1 :
	const { productItems } = Data;
	const { shopItems } = SData;

	return (
		<div>
			<RootLayout>
				<Routes>
					<Route
						path="/"
						element={
							<Pages productItems={productItems} shopItems={shopItems} />
						}
					/>
					<Route path="/cart" element={<Cart />} />
					<Route path="/category/men" element={<Men />} />
					{/* 👇️ when no other routes match */}
					<Route path="*" element={<Pages />} />
				</Routes>
			</RootLayout>
		</div>
	);
}

export default App;
