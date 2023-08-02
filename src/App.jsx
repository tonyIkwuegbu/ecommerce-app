import "./App.css";
import { Route, Routes } from "react-router-dom";
import Pages from "./pages/Pages";
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
import Checkout from "./common/checkout/Checkout";
import ConfirmationPage from "./pages/ConfirmationPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PrivateRoute from "./pages/PrivateRoute";
import Account from "./pages/account";
import OrdersPage from "./pages/orders";

function App() {
	return (
		<div>
			<RootLayout>
				<Routes>
					<Route path="/" element={<Pages />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/category/men" element={<Men />} />
					<Route path="/category/women" element={<Women />} />
					<Route path="/category/children" element={<AllChildren />} />
					<Route path="/category/beauty" element={<AllBeauty />} />
					<Route path="/category/home_essentials" element={<AllEssentials />} />
					<Route
						path="/checkout"
						element={
							<PrivateRoute>
								<Checkout />
							</PrivateRoute>
						}
					/>
					<Route
						path="/my-account"
						element={
							<PrivateRoute>
								<Account />
							</PrivateRoute>
						}
					/>
					<Route
						path="/my-orders"
						element={
							<PrivateRoute>
								<OrdersPage />
							</PrivateRoute>
						}
					/>

					<Route path="/paymentstatus" element={<ConfirmationPage />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/product/:id/:supplier_id" element={<Product />} />
					{/* 👇️ when no other routes match */}
					<Route path="*" element={<Pages />} />
				</Routes>
			</RootLayout>
		</div>
	);
}

export default App;
