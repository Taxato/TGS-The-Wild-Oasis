import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createEditCabin as createEditCabinApi } from "../../services/apiCabins";

export function useCreateEditCabin(isEditSession) {
	const queryClient = useQueryClient();

	const { isLoading: isCreateEditing, mutate: createEditCabin } = useMutation(
		{
			mutationFn: ({ data, editId }) => createEditCabinApi(data, editId),
			onSuccess: () => {
				toast.success(
					isEditSession
						? "Cabin successfully updated"
						: "New cabin successfully created"
				);
				queryClient.invalidateQueries({ queryKey: ["cabins"] });
			},
			onError: err => {
				toast.error(err.message);
			},
		}
	);

	return { isCreateEditing, createEditCabin };
}
