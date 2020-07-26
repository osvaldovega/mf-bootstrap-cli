'use strict';
import { validateNodeVersion } from './utils/validateNodeVersion';
import { cli } from './cli';

validateNodeVersion();
cli(process.argv);
