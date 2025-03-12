import { platform } from "os";

const books = {
	data: {
		name: "books",
		singularName: "book",
		pluralName: "books",
	},
	itemsTable: {
		values: ["name", "isActive"],
		indexValueName: "",
	},
	forms: {
		defaultValues: {
			isActive: false,
		},
		new: [
			{
				name: "name",
				label: "Book Name",
				placeholder: "Enter the book name here",
				type: "text",
				validation: "name",
			},
		],
		update: {
			hasSepareteActivationToggle: true,
			related: [
				{
					name: "payments",
					relatedValue: "parent_id",
					passedValue: "_id",
				},
			],
			arrayList: [
				{
					name: "pages",
					sectionTitle: "Pages",
					sectionTitleSingular: "Page",
					useDrawerToUpdate: true,
					itemsTable: {
						values: ["title", "type"],
						indexValueName: "page",
					},
					/*newItem: {
						title: "My Title",
						type: "page",
						content: "New Page content",
					},*/
					values: [
						{
							name: "title",
							label: "Page Title",
							placeholder: "Add a title here",
							type: "text",
							validation: "textAllowEmptyString",
						},
						{
							name: "type",
							label: "Page type",
							defaultValue: { value: "page" },
							type: "select",
							validation: "text",
							options: [
								{ value: "page", name: "Page" },
								{ value: "front", name: "Front Cover" },
								{ value: "back", name: "Back Cover" },
							],
						},
						{
							name: "content",
							label: "Page Content",
							type: "texteditor",
							validation: "title",
							imageCategory: "books",
							useItemIdAsImageParent: true,
						},
					],
				},
				/*{
					name: "editors",
					sectionTitle: "Editors",
					itemsTable: {
						values: ["email"],
						indexValueName: "editor ",
					},
					useDrawerToUpdate: false,
					values: [
						{
							name: "email",
							label: "Email",
							placeholder: "Enter the email here",
							type: "text",
							validation: "textAllowEmptyString",
						},
					],
				},*/
			],
			values: [
				{
					name: "name",
					label: "Book Name",
					placeholder: "Enter the book name here",
					type: "text",
					validation: "name",
				},
				{
					name: "editors",
					label: "Editors",
					placeholder: "Enter the editor email here",
					type: "multiValue",
					validation: "textAllowEmptyString",
					multiValueValidation: "email",
				},
			],
		},
	},
};

export default books;
