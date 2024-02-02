import CabinTableOperations from "../features/cabins/CabinTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "./../features/cabins/CabinTable";
import CreateCabin from "./../features/cabins/CreateCabin";

function Cabins() {
	return (
		<>
			<Row>
				<Heading as="h1">All cabins</Heading>
				<CabinTableOperations />
			</Row>

			<Row type="vertical">
				<CabinTable />

				<CreateCabin />
			</Row>
		</>
	);
}

export default Cabins;
