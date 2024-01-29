import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
	const { data, error } = await supabase.from("cabins").select("*");

	if (error) {
		console.error(error);
		throw new Error("Cabins could not be loaded");
	}

	return data;
}

export async function createEditCabin(newCabin, id) {
	// 1. Check if new image submitted
	const hasNewImage = typeof newCabin.image === "object";

	let imagePath;
	let imageName;
	if (hasNewImage) {
		imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
			"/",
			""
		);
		imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
	} else imagePath = newCabin.image;

	// 2. Create/edit cabin
	let query = supabase.from("cabins");

	// A) CREATE
	if (id === undefined)
		query = await query
			.insert({ ...newCabin, image: imagePath })
			.select()
			.single();

	// B) EDIT
	if (id !== undefined)
		query = await query
			.update({ ...newCabin, image: imagePath })
			.eq("id", id)
			.select()
			.single();

	const { data, error } = query;

	if (error) {
		console.error(error);
		throw new Error("Cabin could not be created");
	}

	// 3. Upload image IF creating new cabin OR new image is submitted

	if (hasNewImage) {
		const { error } = await supabase.storage
			.from("cabin-images")
			.upload(imageName, newCabin.image, {
				cacheControl: "3600",
				upsert: false,
			});

		// 4. Delete the cabin IF there was an error uploading image

		if (error) {
			await supabase.from("cabins").delete().eq("id", data.id);
			console.error(error);
			throw new Error(
				"Cabin image could not be uploaded, so cabin was not created"
			);
		}
	}

	return data;
}

export async function deleteCabin(id) {
	// const { data, error } = await supabase
	const { error } = await supabase
		.from("cabins")
		.delete()
		.eq("id", id)
		.select()
		.single();

	if (error) {
		console.error(error);
		throw new Error("Cabin could not be deleted");
	}

	/* 
    // DELETING IMAGE
    const imageName = data.image.slice(data.image.lastIndexOf("/") + 1);

	const { error: storageError } = await supabase.storage
		.from("cabin-images")
		.remove([imageName]);

	if (storageError) {
		console.error(storageError);
		throw new Error("Cabin photo could not be deleted");
	} 
    */
}
