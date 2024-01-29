import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createEditCabin as editCabinApi } from "../../services/apiCabins";

export function useEditCabin() {
	const queryClient = useQueryClient();

	const { isLoading: isEditing, mutate: editCabin } = useMutation({
		mutationFn: ({ data, editId }) => editCabinApi(data, editId),
		onSuccess: () => {
			toast.success("Cabin successfully updated");
			queryClient.invalidateQueries({ queryKey: ["cabins"] });
		},
		onError: err => {
			toast.error(err.message);
		},
	});

	return { isEditing, editCabin };
}
