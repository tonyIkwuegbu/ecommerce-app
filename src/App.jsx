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
import Women from "./pages/women";
import Product from "./pages/product";
import "react-loading-skeleton/dist/skeleton.css";
import AllChildren from "./pages/children";
import AllBeauty from "./pages/beauty";
import AllEssentials from "./pages/essentials";

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
					<Route path="/category/women" element={<Women />} />
					<Route path="/category/children" element={<AllChildren />} />
					<Route path="/category/beauty" element={<AllBeauty />} />
					<Route path="/category/home_essentials" element={<AllEssentials />} />
					<Route path="/product/:id/:supplier_id" element={<Product />} />
					{/* 👇️ when no other routes match */}
					<Route path="*" element={<Pages />} />
				</Routes>
			</RootLayout>
		</div>
	);
}

export default App;
