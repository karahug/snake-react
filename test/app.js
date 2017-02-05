import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import App from '../src/App.jsx';

describe('<App/>', ()=>{
    it('calls componentDidMount()', ()=>{
        // Needs jsdom maybe
        // see also: https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md
        sinon.stub(App.prototype, 'componentDidMount');
        const wrapper = mount(<App />);
        expect(App.prototype.componentDidMount.calledOnce).to.equal(true);
    });
    it('renders board', ()=>{
       const rendered = shallow(<App />);
       expect(rendered.find('.board')).to.have.length(1);
    });
});