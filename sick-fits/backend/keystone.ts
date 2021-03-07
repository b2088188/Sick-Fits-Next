import "dotenv/config";
import { config, createSchema } from "@keystone-next/keystone/schema";
import User from "./schemas/User";
import { createAuth } from "@keystone-next/auth";
import {
	withItemData,
	statelessSessions,
} from "@keystone-next/keystone/session";

const databaseURL = process.env.DATABASE_URL;
const sessionConfig = {
	maxAge: 60 * 60 * 24 * 1, // Cookie expired time
	secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
	listKey: "User",
	identityField: "email",
	secretField: "password",
	initFirstItem: {
		fields: ["name", "email", "password"],
		// add in initial roles here
	},
});

export default withAuth(
	config({
		server: {
			cors: {
				origin: [process.env.FRONTEND_URL],
				credentials: true,
			},
		},
		db: {
			adapter: "mongoose",
			url: databaseURL,
			// Add data seeding here
		},
		lists: createSchema({
			User,
			// Schema items go in here
		}),
		ui: {
			// Show the UI only for people who pass this test
			isAccessAllowed: ({ session }) => {
				if (session?.data) return true;
				return false;
			},
		},
		session: withItemData(statelessSessions(sessionConfig), {
			User: `id`,
		}),
	})
);
