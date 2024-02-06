import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate: deleteBooking, isLoading } = useMutation({
		mutationFn: bookingId => deleteBookingApi(bookingId),

		onSuccess: data => {
			toast.success(`Booking #${data.id} successfully deleted`);
			queryClient.invalidateQueries(["bookings"]);
			navigate("/bookings");
		},

		onError: () => toast.error("Booking could not be deleted"),
	});

	return { deleteBooking, isLoading };
}
