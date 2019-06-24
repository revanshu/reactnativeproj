import React from 'react';
import { shallow } from 'enzyme';
import Module from '../src/index';

const navigation = {
  dispatch: jest.fn(),
  openDrawer: jest.fn(),
  state: {
    params: {
      userInfo: {
        countryCode: 'US',
        siteId: 5505,
        userId: 'ajsnow',
      },
    },
  },
};

describe('Button', () => {
  describe('Rendering', () => {
    it('should match to snapshot', () => {
      const component = shallow(<Module navigation={navigation} />);
      expect(component).toMatchSnapshot();
    });
  });
});
