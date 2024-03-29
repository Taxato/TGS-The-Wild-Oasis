import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createUpdateCabin as createCabinApi } from "../../services/apiCabins";

export function useCreateCabin() {
	const queryClient = useQueryClient();

	const { mutate: createCabin, isLoading } = useMutation({
		mutationFn: data => createCabinApi(data),
		onSuccess: () => {
			toast.success("New cabin successfully created");
			queryClient.invalidateQueries({ queryKey: ["cabins"] });
		},
		onError: err => {
			toast.error(err.message);
		},
	});

	return { createCabin, isLoading };
}
