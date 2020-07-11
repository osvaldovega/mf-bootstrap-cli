import arg from 'arg';

export const parseArgumentsIntoOptions = (rawArgs) => {
	const args = arg(
		{
			// Types
			'--git': Boolean,
			'--install': Boolean,
			'--name': String,
			'--yes': Boolean,

			// Aliases
			'-g': '--git',
			'-i': '--install',
			'-n': '--name',
			'-y': '--yes',
		},
		{
			argv: rawArgs.slice(2),
		},
	);

	return {
		git: args['--git'] || false,
		runInstall: args['--install'] || false,
		appName: args['--name'] || '',
		skipPrompts: args['--yes'] || false,
		template: args._[0],
	};
};
