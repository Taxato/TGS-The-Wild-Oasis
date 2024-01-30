import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createUpdateCabin as updateCabinApi } from "../../services/apiCabins";

export function useUpdateCabin() {
	const queryClient = useQueryClient();

	const { isLoading: isUpdateing, mutate: updateCabin } = useMutation({
		mutationFn: ({ data, updateId }) => updateCabinApi(data, updateId),
		onSuccess: () => {
			toast.success("Cabin successfully updated");
			queryClient.invalidateQueries({ queryKey: ["cabins"] });
		},
		onError: err => {
			toast.error(err.message);
		},
	});

	return { isUpdateing, updateCabin };
}
