import { useState } from "react";
import "./App.css";
import Header from "./common/head/Header";
import { Routes, Route } from "react-router-dom";
import Pages from "./pages/Pages";
import Data from "./components/Data";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "./common/footer/Footer";
import Cart from "./common/Cart/Cart";

function App() {
	//Step 1 :
	const { productItems } = Data;

	//Step 2 :
	const [CartItem, setCartItem] = useState([]);

	//Step 4 :
	const addToCart = (product) => {
		const productExit = CartItem.find((item) => item.id === product.id);
		if (productExit) {
			setCartItem(
				CartItem.map((item) =>
					item.id === product.id
						? { ...productExit, qty: productExit.qty + 1 }
						: item,
				),
			);
		} else {
			setCartItem([...CartItem, { ...product, qty: 1 }]);
		}
	};

	// Stpe: 6
	const decreaseQty = (product) => {
		const productExit = CartItem.find((item) => item.id === product.id);

		if (productExit.qty === 1) {
			setCartItem(CartItem.filter((item) => item.id !== product.id));
		} else {
			setCartItem(
				CartItem.map((item) =>
					item.id === product.id
						? { ...productExit, qty: productExit.qty - 1 }
						: item,
				),
			);
		}
	};
	return (
		<div>
			<Header CartItem={CartItem} />
			<Routes>
				<Route
					path="/"
					element={<Pages productItems={productItems} addToCart={addToCart} />}
				/>
				<Route
					path="/cart"
					element={
						<Cart
							CartItem={CartItem}
							addToCart={addToCart}
							decreaseQty={decreaseQty}
						/>
					}
				/>
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
