import { useState } from "react";

export function FileUpload(props: { onResponse: (result: any) => void }) {
	const [fileUpload, setFileUpload] = useState<File | null>(null);

	async function sendImage() {
		const input = document.getElementById("file-upload") as HTMLInputElement;

		if (!input || !input.files || !input.files[0]) {
			throw new Error("this shouldn't happen");
		}

		const formData = new FormData();
		formData.append("file", input.files[0]);
		setFileUpload(input.files[0]);

		try {
			const response = await fetch("http://localhost:8888/", {
				method: "POST",
				body: formData,
			});

			if (response.ok) {
				const data = await response.json();
				props.onResponse(data);
			} else {
				props.onResponse(undefined);
			}
		} catch (error) {
			console.error("Error uploading file:", error);
			props.onResponse(undefined);
		}
	}

	return (
		<>
			<div className="flex flex-col items-center space-y-8">
				<div className="flex justify-center items-center space-y-4">
					<label
						htmlFor="file-upload"
						className="cursor-pointer bg-gradient-to-r from-gray-800 to-gray-600 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-gradient-to-l text-lg font-semibold"
					>
						Upload Image
					</label>
					<input
						id="file-upload"
						type="file"
						className="hidden"
						accept=".jpg, .jpeg, .png"
						onChange={sendImage}
					/>
				</div>

				<div className="flex justify-between items-center gap-6 bg-gray-700 p-4 rounded-lg shadow-md">
					<div className="text-gray-300 font-medium text-sm">
						Accepted file types:{" "}
						<span className="font-semibold text-indigo-400">
							.jpg, .jpeg, .png
						</span>
						<div className="items-center text-center py-3 px-5 rounded-lg shadow-lg bg-gray-800">
							{fileUpload ? fileUpload.name : ""}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
