import { useForm } from "react-hook-form";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";

import { useCreateEditCabin } from "./useCreateEditCabin";

export default function CreateCabinForm({ cabinToEdit = {}, setShowForm }) {
	const { id: editId, ...editValues } = cabinToEdit;
	const isEditSession = editId !== undefined;

	const {
		register,
		handleSubmit,
		reset,
		getValues,
		formState: { errors },
	} = useForm({
		defaultValues: isEditSession ? editValues : {},
	});

	const { isCreateEditing, createEditCabin } =
		useCreateEditCabin(isEditSession);

	function onSubmit(data) {
		let image;
		if (typeof data.image === "string" || data.image.length === 0)
			image = editValues.image;
		else image = data.image[0];
		createEditCabin(
			{ data: { ...data, image }, editId },
			{
				onSuccess: () => reset(),
			}
		);

		reset();
		if (isEditSession) setShowForm(false);
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRow label="Cabin Name" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isCreateEditing}
					{...register("name", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow
				label="Maximum capacity"
				error={errors?.maxCapacity?.message}>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isCreateEditing}
					{...register("maxCapacity", {
						required: "This field is required",
						min: {
							value: 1,
							message: "Capacity should be at least 1",
						},
					})}
				/>
			</FormRow>

			<FormRow
				label="Regular price"
				error={errors?.regularPrice?.message}>
				<Input
					type="number"
					id="regularPrice"
					disabled={isCreateEditing}
					{...register("regularPrice", {
						required: "This field is required",
						min: {
							value: 1,
							message: "Capacity should be at least 1",
						},
					})}
				/>
			</FormRow>

			<FormRow label="Discount" error={errors?.discount?.message}>
				<Input
					type="number"
					id="discount"
					disabled={isCreateEditing}
					defaultValue={0}
					{...register("discount", {
						required: "This field is required",
						validate: val =>
							+val <= +getValues().regularPrice ||
							"Discount should not be greater than price",
					})}
				/>
			</FormRow>

			<FormRow
				label="Description for website"
				error={errors?.description?.message}>
				<Textarea
					type="number"
					id="description"
					disabled={isCreateEditing}
					defaultValue=""
					{...register("description", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow label="Cabin photo" error={errors?.image?.message}>
				<FileInput
					id="image"
					accept="image/*"
					{...register("image", {
						required: isEditSession
							? false
							: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow>
				<Button
					$variation="secondary"
					type="reset"
					onClick={() => setShowForm(false)}>
					Cancel
				</Button>
				<Button disabled={isCreateEditing}>
					{isEditSession ? "Edit" : "Create"} cabin
				</Button>
			</FormRow>
		</Form>
	);
}
