import { useSearchParams } from "react-router-dom";

import Select from "./Select";

export default function SortBy({ options }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const sortBy = searchParams.get("sortBy") || "";

	function handleChange(e) {
		const val = e.target.value;

		searchParams.set("sortBy", val);
		setSearchParams(searchParams);
	}

	return (
		<Select
			options={options}
			value={sortBy}
			onChange={handleChange}
			type="white"></Select>
	);
}
