import { useEffect, useState } from "react";
import { makeRequest } from "../Api";
import ShuffleArray from "../utils/Shuffle";
import { message } from "antd";

const useFetch = (url) => {
	const [data, setData] = useState(null);
	const [shuffledData, setShuffledData] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const res = await makeRequest.get(url);
				setData(res.data.data);
				setShuffledData(ShuffleArray(res.data.data));
			} catch (error) {
				console.log(error);
				message.error(error.message);
			}
			setLoading(false);
		};
		fetchData();
	}, [url]);

	useEffect(() => {
		// Function to shuffle the product data and update the state
		const shuffleProducts = () => {
			setShuffledData((prevData) => ShuffleArray([...prevData]));
		};

		// Shuffle products every 1 hour (3600000 milliseconds)
		const interval = setInterval(shuffleProducts, 3600000); // 1 hour

		// Cleanup interval on component unmount
		return () => clearInterval(interval);
	}, []);

	return { data, loading, shuffledData };
};

export default useFetch;
