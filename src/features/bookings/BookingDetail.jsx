import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useCheckOut } from "../check-in-out/useCheckout";
import { useBooking } from "./useBooking";
import { useDeleteBooking } from "./useDeleteBooking";

import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Heading from "../../ui/Heading";
import Modal from "../../ui/Modal";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import Tag from "../../ui/Tag";
import BookingDataBox from "./BookingDataBox";

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`;

function BookingDetail() {
	const { booking, isLoading, error } = useBooking();
	const { checkOut, isLoading: isCheckingOut } = useCheckOut();
	const { deleteBooking, isLoading: isDeleting } = useDeleteBooking();
	const moveBack = useMoveBack();
	const navigate = useNavigate();

	if (isLoading) return <Spinner />;
	if (error) return <p>{error.message}</p>;

	const { id: bookingId, status } = booking;

	const statusToTagName = {
		unconfirmed: "blue",
		"checked-in": "green",
		"checked-out": "silver",
	};

	return (
		<>
			<Row type="horizontal">
				<HeadingGroup>
					<Heading as="h1">Booking #{bookingId}</Heading>
					<Tag type={statusToTagName[status]}>
						{status.replace("-", " ")}
					</Tag>
				</HeadingGroup>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			<Modal>
				<ButtonGroup>
					{status === "unconfirmed" && (
						<Button
							onClick={() => navigate(`/checkin/${bookingId}`)}>
							Check in
						</Button>
					)}

					{status === "checked-in" && (
						<Button
							onClick={() => checkOut(bookingId)}
							disabled={isCheckingOut}>
							Check out
						</Button>
					)}

					<Modal.Open opens="delete-booking">
						<Button $variation="danger" disabled={isDeleting}>
							Delete
						</Button>
					</Modal.Open>

					<Button $variation="secondary" onClick={moveBack}>
						Back
					</Button>
				</ButtonGroup>

				<Modal.Window name="delete-booking">
					<ConfirmDelete
						resourceName="booking"
						onConfirm={() => deleteBooking(bookingId)}
						disabled={isDeleting}
					/>
				</Modal.Window>
			</Modal>
		</>
	);
}

export default BookingDetail;
