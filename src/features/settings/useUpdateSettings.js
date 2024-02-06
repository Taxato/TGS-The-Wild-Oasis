import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
	const queryClient = useQueryClient();

	const { mutate: updateSetting, isLoading } = useMutation({
		mutationFn: data => updateSettingApi(data),
		onSuccess: () => {
			toast.success("Setting successfully updated");
			queryClient.invalidateQueries({ queryKey: ["settings"] });
		},
		onError: err => {
			toast.error(err.message);
		},
	});

	return { updateSetting, isLoading };
}
