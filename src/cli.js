import { createProject } from './utils/createProject';
import { parseArgumentsIntoOptions } from './utils/parseArguments';
import { promptForMissingOptions } from './utils/validatePromptValues';

export async function cli(args) {
	const options = parseArgumentsIntoOptions(args);
	const updateOptions = await promptForMissingOptions(options);

	const { version, help } = options;

	if (!version && !help) await createProject(updateOptions);
}
