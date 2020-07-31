import arg from 'arg';

export const parseArgumentsIntoOptions = (rawArgs) => {
	const args = arg(
		{
			// Types
			'--git': Boolean,
			'--install': Boolean,
			'--name': String,
			'--skip': Boolean,
			'--pManager': String,
			'--template': String,
			'--version': Boolean,
			'--help': Boolean,

			// Aliases
			'-g': '--git',
			'-i': '--install',
			'-n': '--name',
			'-s': '--skip',
			'-p': '--pManager',
			'-t': '--template',
			'-v': '--version',
			'-h': '--help',
		},
		{
			argv: rawArgs.slice(2),
		},
	);

	return {
		git: args['--git'] || false,
		install: args['--install'] || false,
		appName: args['--name'] || '',
		skipPrompts: args['--skip'] || false,
		template: args['--template'] || '',
		packageManager: args['--pManager'] || '',
		version: args['--version'] || false,
		help: args['--help'] || false,
	};
};
