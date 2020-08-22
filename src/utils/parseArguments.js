import arg from 'arg';

const parseArgumentsIntoOptions = (rawArgs) => {
  const args = arg(
    {
      // Types
      '--name': String,
      '--template': String,
      '--git': Boolean,
      '--install': Boolean,
      '--pManager': String,
      '--skip': Boolean,
      '--version': Boolean,
      '--help': Boolean,

      // Aliases
      '-n': '--name',
      '-t': '--template',
      '-g': '--git',
      '-i': '--install',
      '-p': '--pManager',
      '-s': '--skip',
      '-v': '--version',
      '-h': '--help',
    },
    {
      argv: rawArgs.slice(2),
    },
  );

  return {
    appName: args['--name'] || '',
    template: args['--template'] || '',
    git: args['--git'] || false,
    packageManager: args['--pManager'] || '',
    install: args['--install'] || false,
    skipPrompts: args['--skip'] || false,
    version: args['--version'] || false,
    help: args['--help'] || false,
  };
};

export default parseArgumentsIntoOptions;
