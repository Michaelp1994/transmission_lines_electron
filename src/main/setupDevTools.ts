/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
import installExtension, {
    REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";

export default async function setupDevTools() {
    // Install DevTools extensions
    if (process.env.NODE_ENV === "development") {
        try {
            const name = await installExtension(REACT_DEVELOPER_TOOLS, {
                loadExtensionOptions: { allowFileAccess: true },
            });
            console.log(`Added Extension:  ${name}`);
        } catch (err) {
            console.log("An error occurred: ", err);
        }
    }
}
