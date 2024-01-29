import { useState } from "react";

import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "./../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateEditCabinForm";

function Cabins() {
	const [showForm, setShowForm] = useState(false);

	return (
		<>
			<Row>
				<Heading as="h1">All cabins</Heading>
				<p>Filter / Sort</p>
			</Row>

			<Row type="vertical">
				<CabinTable />

				<Button onClick={() => setShowForm(s => !s)}>
					Create new cabin
				</Button>
				{showForm && <CreateCabinForm setShowForm={setShowForm} />}
			</Row>
		</>
	);
}

export default Cabins;
