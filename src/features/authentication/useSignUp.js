import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signUp as signUpApi } from "../../services/apiAuth";

export function useSignUp() {
	const { mutate: signUp, isLoading } = useMutation({
		mutationFn: signUpApi,
		onSuccess: user => {
			console.log(user);
			toast.success(
				"User successfully signed up. Please verify the new account from the user's email address"
			);
		},
	});

	return { signUp, isLoading };
}
