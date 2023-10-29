import { useEffect, useState } from "react";
import { makeRequest } from "../Api";
import ShuffleArray from "../utils/Shuffle";

const useFetch = (url) => {
	const [data, setData] = useState(null);
	const [shuffledData, setShuffledData] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const res = await makeRequest.get(`${url}`);
				setData(res.data.data);
				setShuffledData(ShuffleArray(res.data.data));
			} catch (error) {
				setShuffledData(ShuffleArray([]));
				setData([]);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [url]);

	useEffect(() => {
		const shuffleProducts = () => {
			setShuffledData((prevData) => ShuffleArray([...prevData]));
		};

		const interval = setInterval(shuffleProducts, 3600000);

		return () => clearInterval(interval);
	}, []);

	return { data, loading, shuffledData };
};

export default useFetch;
