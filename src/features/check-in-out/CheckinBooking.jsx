import { useEffect, useState } from "react";
import styled from "styled-components";

import { useMoveBack } from "../../hooks/useMoveBack";
import { formatCurrency } from "../../utils/helpers";
import { useBooking } from "../bookings/useBooking";

import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import BookingDataBox from "../bookings/BookingDataBox";
import Checkbox from "./../../ui/Checkbox";
import { useCheckIn } from "./useCheckIn";

const Box = styled.div`
	/* Box */
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
	padding: 2.4rem 4rem;
`;

export default function CheckinBooking() {
	const [confirmPaid, setConfirmPaid] = useState(false);
	const { booking, isLoading, error } = useBooking();

	const moveBack = useMoveBack();
	const { checkIn, isCheckingIn } = useCheckIn();

	useEffect(() => {
		setConfirmPaid(booking?.isPaid ?? false);
	}, [booking]);

	if (isLoading) return <Spinner />;
	if (error) return <p>{error.message}</p>;

	const {
		id: bookingId,
		guests: { fullName },
		totalPrice,
	} = booking;

	function handleCheckin() {
		if (!confirmPaid) return;

		checkIn(bookingId);
	}

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">Check in booking #{bookingId}</Heading>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			<Box>
				<Checkbox
					checked={confirmPaid}
					onChange={e => setConfirmPaid(e.target.checked)}
					id="confirm"
					disabled={confirmPaid || isCheckingIn}>
					I confirm that {fullName} has paid the total amount of{" "}
					{formatCurrency(totalPrice)}
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
