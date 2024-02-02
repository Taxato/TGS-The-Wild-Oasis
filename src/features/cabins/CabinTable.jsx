import { useCabins } from "./useCabins";

import Spinner from "./../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

export default function CabinTable() {
	const { cabins, isLoading } = useCabins();
	const [searchParams] = useSearchParams();

	if (isLoading) return <Spinner />;

	// FILTER
	const filterVal = searchParams.get("discount");

	let filteredCabins;
	switch (filterVal) {
		case "no-discount":
			filteredCabins = cabins.filter(c => c.discount === 0);
			break;

		case "with-discount":
			filteredCabins = cabins.filter(c => c.discount > 0);
			break;

		default:
			filteredCabins = cabins;
			break;
	}

	// SORT
	const sortBy = searchParams.get("sortBy");
	const [field, direction] = sortBy.split("-");
	const modifier = direction === "asc" ? 1 : -1;

	function compare(a, b) {
		const aName = a.name.toLowerCase();
		const bName = b.name.toLowerCase();

		return aName.localeCompare(bName);
	}

	const sortedCabins = filteredCabins.sort((a, b) => {
		const res = (a[field] - b[field]) * modifier;

		if (res === 0) return compare(a, b);
		else if (field === "name") return compare(a, b) * modifier;
		else return res;
	});

	return (
		<Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
			<Table.Header>
				<div></div>
				<div>Name</div>
				<div>Capacity</div>
				<div>Price</div>
				<div>Discount</div>
				<div></div>
			</Table.Header>

			<Menus>
				<Table.Body
					data={sortedCabins}
					render={cabin => <CabinRow cabin={cabin} key={cabin.id} />}
				/>
			</Menus>
		</Table>
	);
}
