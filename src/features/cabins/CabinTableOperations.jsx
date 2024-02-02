import TableOperations from "./../../ui/TableOperations";
import Filter from "./../../ui/Filter";
import SortBy from "./../../ui/SortBy";

export default function CabinTableOperations() {
	return (
		<TableOperations>
			<Filter
				filterField="discount"
				options={[
					{ val: "all", label: "All" },
					{ val: "no-discount", label: "No discount" },
					{ val: "with-discount", label: "With discount" },
				]}
			/>

			<SortBy
				options={[
					{ val: "name-asc", label: "Sort by name (A-Z)" },
					{ val: "name-desc", label: "Sort by name (Z-A)" },
					{
						val: "regularPrice-asc",
						label: "Sort by price (Low-High)",
					},
					{
						val: "regularPrice-desc",
						label: "Sort by price (High-Low)",
					},
					{
						val: "maxCapacity-asc",
						label: "Sort by max capacity (Low-High)",
					},
					{
						val: "maxCapacity-desc",
						label: "Sort by max capacity (High-Low)",
					},
				]}
			/>
		</TableOperations>
	);
}
