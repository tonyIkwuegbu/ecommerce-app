import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Pages from "./pages/Pages";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RootLayout from "./RootLayout";
import Product from "./pages/product";
import "react-loading-skeleton/dist/skeleton.css";
import Checkout from "./common/checkout/Checkout";
import ConfirmationPage from "./pages/ConfirmationPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PrivateRoute from "./pages/PrivateRoute";
import Account from "./pages/account";
import OrdersPage from "./pages/orders";
import PopularPage from "./pages/popularMainPage/index";
import ArrivalPage from "./pages/arrivalsPage/index";
import TopDealMain from "./pages/topDealMain";
import CategoryPage from "./pages/categoryPage/CategoryPage";
import CartMain from "./common/Cart/CartMain";
import Search from "./components/search/Search";

function App() {
	return (
		<div>
			<RootLayout>
				<Routes>
					<Route path="/" element={<Pages />} />
					<Route path="/cart" element={<CartMain />} />
					<Route path="/checkout" element={<Checkout />} />
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
					<Route path="/popular-products" element={<PopularPage />} />
					<Route path="/top-deals" element={<TopDealMain />} />
					<Route path="/new-arrivals" element={<ArrivalPage />} />
					<Route path="/paymentstatus" element={<ConfirmationPage />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/product/:id/:supplier_id" element={<Product />} />
					<Route path="/category/:category" element={<CategoryPage />} />
					<Route path="/search" element={<Search />} />
					{/* 👇️ when no other routes match */}
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</RootLayout>
		</div>
	);
}

export default App;
