import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";
import { PAGE_SIZE } from "./../../utils/constants";

export function useBookings() {
	const queryClient = useQueryClient();
	const [searchParams] = useSearchParams();

	// FILTER
	const filterValue = searchParams.get("status");
	const filter =
		filterValue === null || filterValue === "all"
			? null
			: { field: "status", value: filterValue };
	// : { field: "totalPrice", value: 5000, method: "gte" };

	// SORT
	const sortByStr = searchParams.get("sortBy") || "startDate-desc";
	const [field, dir] = sortByStr.split("-");
	const sortBy = {
		field,
		dir,
	};

	// PAGINATION
	const page =
		searchParams.get("page") === null
			? 1
			: Number(searchParams.get("page"));

	// QUERY
	const {
		isLoading,
		data: { data: bookings, count } = {},
		error,
	} = useQuery({
		queryKey: ["bookings", filter, sortBy, page],
		queryFn: () => getBookings({ filter, sortBy, page }),
	});

	// PRE-FETCHING
	const pageCount = Math.ceil(count / PAGE_SIZE);

	if (page < pageCount)
		queryClient.prefetchQuery({
			queryKey: ["bookings", filter, sortBy, page + 1],
			queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
		});

	if (page > 1)
		queryClient.prefetchQuery({
			queryKey: ["bookings", filter, sortBy, page - 1],
			queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
		});

	return { isLoading, bookings, error, count };
}
