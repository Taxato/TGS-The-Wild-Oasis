import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings.js";

export function useBooking(id) {
	const { bookingId } = useParams();

	const {
		data: booking,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["booking"],
		queryFn: () => getBooking(bookingId),
	});

	return { booking, isLoading, error };
}
