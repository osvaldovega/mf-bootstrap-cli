import { greenBold } from './chalk';

export const mainBannerMessage = () => {
	console.log(`\n\n  🛠  ${greenBold('Creating Application...')}\n`);
};

export const SuccessMessage = () => {
	console.log(`\n  ✅  ${greenBold('DONE')}  Project is ready.\n`);
};

export default {
	mainBannerMessage,
	SuccessMessage,
};
