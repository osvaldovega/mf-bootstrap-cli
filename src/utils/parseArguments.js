import arg from 'arg';

export const parseArgumentsIntoOptions = (rawArgs) => {
	const args = arg(
		{
			// Types
			'--git': Boolean,
			'--install': Boolean,
			'--name': String,
			'--yes': Boolean,
			'--pManager': String,
			'--template': String,

			// Aliases
			'-g': '--git',
			'-i': '--install',
			'-n': '--name',
			'-y': '--yes',
			'-pm': '--pManager',
			'-t': '--template',
		},
		{
			argv: rawArgs.slice(2),
		},
	);

	return {
		git: args['--git'] || false,
		install: args['--install'] || false,
		appName: args['--name'] || '',
		skipPrompts: args['--yes'] || false,
		template: args['--template'] || '',
		packageManager: args['--pManager'] || '',
	};
};
