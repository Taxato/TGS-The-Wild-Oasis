import { useEffect, useRef } from "react";

export function useClickOutside(handler, useCapture = true) {
	const ref = useRef();

	useEffect(() => {
		function handleClick(e) {
			if (ref.current && !ref.current.contains(e.target)) {
				handler();
			}
		}

		document.addEventListener("click", handleClick, useCapture);

		return () => document.removeEventListener("click", handleClick);
	}, [handler, useCapture]);

	return ref;
}
