import { useEffect, useState } from "react";
import styled from "styled-components";

import { useMoveBack } from "../../hooks/useMoveBack";
import { formatCurrency } from "../../utils/helpers";
import { useBooking } from "../bookings/useBooking";
import { useSettings } from "../settings/useSettings";
import { useCheckIn } from "./useCheckIn";

import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import BookingDataBox from "../bookings/BookingDataBox";
import Checkbox from "./../../ui/Checkbox";

const Box = styled.div`
	/* Box */
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
	padding: 2.4rem 4rem;
`;

export default function CheckinBooking() {
	const [confirmPaid, setConfirmPaid] = useState(false);
	const [addBreakfast, setAddBreakfast] = useState(false);
	const { booking, isLoading: isLoadingBooking, error } = useBooking();
	const { settings, isLoading: isLoadingSettings } = useSettings();

	const moveBack = useMoveBack();
	const { checkIn, isCheckingIn } = useCheckIn();

	useEffect(() => {
		setConfirmPaid(booking?.isPaid ?? false);
	}, [booking]);

	if (isLoadingBooking || isLoadingSettings) return <Spinner />;
	if (error) return <p>{error.message}</p>;

	const {
		id: bookingId,
		guests: { fullName },
		totalPrice,
		numGuests,
		hasBreakfast,
	} = booking;

	const optionalBreakfastPrice = settings
		? settings.breakfastPrice * numGuests
		: null;

	function handleCheckin() {
		if (!confirmPaid) return;

		if (addBreakfast) {
			checkIn({
				bookingId,
				breakfast: {
					hasBreakfast: true,
					extrasPrice: optionalBreakfastPrice,
					totalPrice: totalPrice + optionalBreakfastPrice,
				},
			});
		} else {
			checkIn({ bookingId, breakfast: {} });
		}
	}

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">Check in booking #{bookingId}</Heading>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			{!hasBreakfast && (
				<Box>
					<Checkbox
						checked={addBreakfast}
						onChange={() => {
							setAddBreakfast(add => !add);
							setConfirmPaid(false);
						}}
						id="breakfast">
						Want to add breakfast for{" "}
						{formatCurrency(optionalBreakfastPrice)}?
					</Checkbox>
				</Box>
			)}

			<Box>
				<Checkbox
					checked={confirmPaid}
					onChange={() => setConfirmPaid(confirm => !confirm)}
					id="confirm"
					disabled={confirmPaid || isCheckingIn}>
					I confirm that {fullName} has paid the total amount of{" "}
					{!addBreakfast
						? formatCurrency(totalPrice)
						: `${formatCurrency(
								totalPrice + optionalBreakfastPrice
						  )} (${formatCurrency(totalPrice)} + ${formatCurrency(
								optionalBreakfastPrice
						  )})`}
				</Checkbox>
			</Box>
			<ButtonGroup>
				<Button
					onClick={handleCheckin}
					disabled={!confirmPaid || isCheckingIn}>
					Check in booking #{bookingId}
				</Button>
				<Button $variation="secondary" onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}
