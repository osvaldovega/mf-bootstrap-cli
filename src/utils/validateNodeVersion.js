import { nodeVersionError } from './logMessages';

export const validateNodeVersion = () => {
	const currentNodeVersion = process.versions.node;
	const semver = currentNodeVersion.split('.');
	const [major] = semver;

	if (major < 10) {
		nodeVersionError(currentNodeVersion);
		process.exit(1);
	}
};
