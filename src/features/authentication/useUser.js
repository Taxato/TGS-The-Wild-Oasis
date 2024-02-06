import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
	const {
		data: user,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["user"],
		queryFn: getCurrentUser,
	});

	if (error) console.log(error.message);

	return { user, isLoading, isAuthenticated: user?.role === "authenticated" };
}
