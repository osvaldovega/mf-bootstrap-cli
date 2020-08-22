import React from 'react';
import { shallow } from 'enzyme';
import Home from '.';

describe('<Home />', () => {
	test('renders without crashing', () => {
		shallow(<Home />);
	});
});
