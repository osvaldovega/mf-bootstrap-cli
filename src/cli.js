import createProject from './utils/createProject';
import parseArgumentsIntoOptions from './utils/parseArguments';
import { validateMissingPromptOptions } from './utils/validations';

export default async function cli(args) {
  const options = parseArgumentsIntoOptions(args);
  const updateOptions = await validateMissingPromptOptions(options);

  const { version, help } = options;

  if (!version && !help) await createProject(updateOptions);
}
