import { useForm } from "react-hook-form";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

export default function CabinForm({ cabinToEdit = {}, setShowForm }) {
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

	const { isCreating, createCabin } = useCreateCabin();
	const { isEditing, editCabin } = useEditCabin();
	const isWorking = isCreating || isEditing;

	function onSubmit(data) {
		let image;
		if (typeof data.image === "string" || data.image.length === 0)
			image = editValues.image;
		else image = data.image[0];

		if (isEditSession) {
			editCabin(
				{ data: { ...data, image }, editId },
				{
					onSuccess: () => reset(),
				}
			);
		} else {
			createCabin(
				{ ...data, image },
				{
					onSuccess: () => reset(),
				}
			);
		}

		reset();
		if (isEditSession) setShowForm(false);
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRow label="Cabin Name" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isWorking}
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
					disabled={isWorking}
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
					disabled={isWorking}
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
					disabled={isWorking}
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
					disabled={isWorking}
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
				<Button disabled={isWorking}>
					{isEditSession ? "Edit" : "Create"} cabin
				</Button>
			</FormRow>
		</Form>
	);
}
