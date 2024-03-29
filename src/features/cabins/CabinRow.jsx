import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers";
import { useCreateCabin } from "./useCreateCabin";
import { useDeleteCabin } from "./useDeleteCabin";

import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import ConfirmDelete from "./../../ui/ConfirmDelete";
import CabinForm from "./CabinForm";
import Menus from "./../../ui/Menus";

const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: "Sono";
`;

const Price = styled.div`
	font-family: "Sono";
	font-weight: 600;
`;

const Discount = styled.div`
	font-family: "Sono";
	font-weight: 500;
	color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
	const { deleteCabin, isLoading: isDeleting } = useDeleteCabin();
	const { createCabin, isLoading: isCreating } = useCreateCabin();

	const {
		id: cabinId,
		name,
		maxCapacity,
		regularPrice,
		discount,
		image,
		description,
	} = cabin;

	function handleDuplicate() {
		createCabin({
			name: `Copy of ${name}`,
			maxCapacity,
			regularPrice,
			discount,
			image,
			description,
		});
	}

	return (
		<>
			<Table.Row>
				<Img src={image} />

				<Cabin>{name}</Cabin>

				<div>Fits up to {maxCapacity} guests</div>

				<Price>{formatCurrency(regularPrice)}</Price>

				{discount ? (
					<Discount>{formatCurrency(discount)}</Discount>
				) : (
					<span>&mdash;</span>
				)}

				<div>
					<Menus.Menu>
						<Modal>
							<Menus.Toggle id={cabinId} />

							<Menus.List id={cabinId}>
								<Menus.Button
									icon={<HiSquare2Stack />}
									disabled={isCreating}
									onClick={handleDuplicate}>
									Duplicate
								</Menus.Button>

								<Modal.Open opens="edit">
									<Menus.Button icon={<HiPencil />}>
										Edit
									</Menus.Button>
								</Modal.Open>

								<Modal.Open opens="delete">
									<Menus.Button icon={<HiTrash />}>
										Delete
									</Menus.Button>
								</Modal.Open>
							</Menus.List>

							<Modal.Window name="edit">
								<CabinForm cabinToUpdate={cabin} />
							</Modal.Window>

							<Modal.Window name="delete">
								<ConfirmDelete
									resourceName="cabin"
									onConfirm={() => deleteCabin(cabinId)}
									disabled={isDeleting}
								/>
							</Modal.Window>
						</Modal>
					</Menus.Menu>
				</div>
			</Table.Row>
		</>
	);
}
