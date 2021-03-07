import { list } from "@keystone-next/keystone/schema";
import { text, select, integer } from "@keystone-next/fields";

const Product = list({
	fields: {
		name: text({ isRequired: true }),
		description: text({ ui: { displayMode: "textarea" } }),
		status: select({
			options: [
				{ label: "Draft", value: "DRAFT" },
				{ label: "Available", value: "AVAILABLE" },
				{ label: "Unavailable", value: "UNAVAILABLE" },
			],
			defaultValue: "DRAFT",
			ui: {
				displayMode: "segmented-control",
				createView: { fieldMode: "hidden" },
			},
		}),
		price: integer(),
		// photo
	},
});

export default Product;
