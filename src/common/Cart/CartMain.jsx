import { useSelector } from "react-redux";
import CartAuth from "./CartAuth";
import Cart from "./Cart";

const CartMain = () => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	return <>{isAuthenticated ? <CartAuth /> : <Cart />}</>;
};

export default CartMain;
