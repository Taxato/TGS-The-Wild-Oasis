import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createUpdateCabin as updateCabinApi } from "../../services/apiCabins";

export function useUpdateCabin() {
	const queryClient = useQueryClient();

	const { mutate: updateCabin, isLoading } = useMutation({
		mutationFn: ({ data, updateId }) => updateCabinApi(data, updateId),
		onSuccess: () => {
			toast.success("Cabin successfully updated");
			queryClient.invalidateQueries({ queryKey: ["cabins"] });
		},
		onError: err => {
			toast.error(err.message);
		},
	});

	return { updateCabin, isLoading };
}
