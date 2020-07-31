import { validateNodeVersion } from './utils/validations';
import cli from './cli';

validateNodeVersion();
cli(process.argv);
