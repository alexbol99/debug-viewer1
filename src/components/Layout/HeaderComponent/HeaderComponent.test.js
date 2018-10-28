import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

import {HeaderComponent} from './HeaderComponent';

import { createStore } from 'redux';
import { reducer } from '../../../store/reducer';
const store = createStore(reducer);

describe('<HeaderComponent />', () => {
    it('shallow renders component without crashing', () => {
        const wrapper = shallow(<HeaderComponent store={store}/>);
        expect(wrapper).toMatchSnapshot();
    });
    it('renders component without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<HeaderComponent store={store}/>, div)
    });
    it('mounts component without crashing', () => {
        const wrapper = mount(<HeaderComponent store={store}/>)
        const title = wrapper.find('.App-header h2');
        expect(title.text()).toBe('Debug Viewer');
    });
    it('renders correctly to match snapshot',() => {
        const header = renderer.create(<HeaderComponent store={store}/>);
        expect(header.toJSON()).toMatchSnapshot();
    });
});

