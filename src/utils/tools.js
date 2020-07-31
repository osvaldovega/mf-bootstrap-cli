import promptQuestions from './questions';

/**
 * Filter the options object to remove (version, help and skip) from object
 * @param {Object} options - Options coming from argvs
 * @return {Array} Options to display in prompt
 */
export const filterOptions = (options) => {
	const filteredOptions = { ...options };

	delete filteredOptions.version;
	delete filteredOptions.help;
	delete filteredOptions.skipPrompts;

	const optionsToPrompt = Object.keys(filteredOptions).reduce((stack, property) => {
		if (!filteredOptions[property]) stack.push(property);
		return stack;
	}, []);

	return optionsToPrompt;
};

/**
 * Based on the options passed as parameter
 * this will return an array with the options to display
 * in the terminal
 * @param {Object} options
 * @return {Array} option to display in prompt
 */
export const optionsToPrompt = (options) => options.map((option) => promptQuestions[option]);

export default {
	filterOptions,
	optionsToPrompt,
};
