import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
	const queryClient = useQueryClient();

	const { mutate: deleteCabin, isLoading } = useMutation({
		mutationFn: deleteCabinApi,
		onSuccess: () => {
			toast.success("Cabin successfully deleted");
			queryClient.invalidateQueries("cabins");
		},
		onError: err => toast.error(err.message),
	});

	return { deleteCabin, isLoading };
}
