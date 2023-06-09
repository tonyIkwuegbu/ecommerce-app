import "./App.css";
import { Route, Routes } from "react-router-dom";
import Pages from "./pages/Pages";
import Data from "./components/Data";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cart from "./common/Cart/Cart";
import RootLayout from "./RootLayout";

function App() {
	//Step 1 :
	const { productItems } = Data;

	return (
		<div>
			<RootLayout>
				<Routes>
					<Route path="/" element={<Pages productItems={productItems} />} />
					<Route path="/cart" element={<Cart />} />
				</Routes>
			</RootLayout>
		</div>
	);
}

export default App;
