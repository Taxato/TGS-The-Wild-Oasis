import { useCabins } from "./useCabins";

import Spinner from "./../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

export default function CabinTable() {
	const { cabins, isLoading } = useCabins();

	if (isLoading) return <Spinner />;

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
					data={cabins}
					render={cabin => <CabinRow cabin={cabin} key={cabin.id} />}
				/>
			</Menus>
		</Table>
	);
}
