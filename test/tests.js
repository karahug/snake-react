import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import App from '../src/App.jsx';

describe('<App/>', ()=>{
    describe('game setup', ()=>{
        describe('component lifecycle', ()=>{
            before(function(){
                sinon.spy(App.prototype, 'componentDidMount');
                App.prototype._tick = sinon.spy(App.prototype._tick); //I still don't understand why this only works on assignment
                const wrapper = mount(<App />);
            });
            it('calls componentDidMount()', ()=>{
                expect(App.prototype.componentDidMount.calledOnce).to.equal(true);
            });
            it('ticks', ()=>{
                expect(App.prototype._tick.called).to.equal(true);
            });
        });
        describe('shallow render', ()=>{
            const rendered = shallow(<App />);
            it('renders board', ()=>{
               expect(rendered.find('.board')).to.have.length(1);
            });
            it('does not render controls', () => {
                expect(rendered.find('#controls')).to.have.length(0);
            });
            it('renders 20x20 pixels', () =>{
               expect(rendered.find('.pixel')).to.have.length(400);
            });
            it('renders a food pixel', ()=>{
                expect(rendered.find(".food")).to.have.length(1);
            });
            it('renders a snake pixel', ()=>{
                expect(rendered.find(".snake")).to.have.length(1);
            });
            describe('initial state', ()=>{
                it('sets initial position', ()=>{
                    expect(rendered.state('snake')).to.have.length(1);
                    expect(rendered.state('snake')).to.be.eql([[10,10]]);
                });
                it('sets paused to false', ()=>{
                   expect(rendered.state('paused')).to.equal(false); 
                });
                
                it('sets direction to null', ()=>{
                    expect(rendered.state('direction')).to.equal(null);
                });
                it('sets initial speed', ()=>{
                    expect(rendered.state('speed')).to.equal(100);
                });
                
                it('sets initial length = 2', ()=>{
                    expect(rendered.state('length')).to.equal(2);
                });
            });
        });
        
    });
    
});

describe('<Pixel />', ()=>{
    
});


describe('Integration', ()=>{
    
});