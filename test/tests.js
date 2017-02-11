import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import App from '../src/App.jsx';
//http://reactkungfu.com/2015/07/approaches-to-testing-react-components-an-overview/
describe('<App/>', ()=>{
    describe('game setup', ()=>{
        describe('component lifecycle', ()=>{
            //var temp = App.prototype._tick;
            var wrapper;
            before(function(){
                sinon.spy(App.prototype, 'componentDidMount');
                sinon.stub(App.prototype, '_tick'); //using sinon.spy causes _tick method tests to misbehave(but still work)
                wrapper = mount(<App />);
            });
            after(function(){
                App.prototype._tick.restore();
                App.prototype.componentDidMount.restore();
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
    
    describe('component methods', ()=>{
        describe('_tick', ()=>{ 
            //will run _tick 10 times when sinon.spy used in lifecycle testing
            //but test will still pass when the component works
            //pass when paused is true, fail when paused is false
            //try using chai-as-promised to clean up the two callback tests
            var rendered;
            var state;
            var _tick;
            beforeEach(()=>{
                rendered = shallow(<App />);
                state = rendered.instance().state;
                _tick = rendered.instance()._tick;
            });
            it("doesn't callback when paused", ()=>{
                state.paused = true; 
                return Promise.race([
                    new Promise(function(resolve, reject){
                        setTimeout(function(){
                            resolve('callback failed');
                        }, 1000);
                    }),
                    new Promise(function(resolve, reject){
                        _tick(function(){
                            resolve('callback succeeded');
                        });
                    })
                ]).then(function(x){
                        expect(x).to.equal('callback failed');
                });
            });
            it('calls back when paused is false', ()=>{
                state.paused = false;
                return Promise.race([
                    new Promise(function(resolve, reject){
                        setTimeout(function(){
                            resolve('callback failed');
                        }, 1000);
                    }),
                    new Promise(function(resolve, reject){
                        _tick(function(){
                            resolve('callback succeeded');
                        });
                    })
                ]).then(function(x){
                        expect(x).to.equal('callback succeeded');
                });
            });
            it('sets a pixel in the correct direction to snake', ()=>{
               state.length = 10;
               state.direction = 'up';
               _tick();
               state.direction = 'left';
               _tick();
               state.direction = 'down';
               _tick();
               _tick();
               state.direction = 'right';
               _tick();
               expect(state.snake).to.eql([[10,10], [9,10], [9,9], [10,9], [11,9], [11,10]]);
            });
            it('calls this._eat when the next pixel is food', ()=>{
                state.food = [9,10];
                state.direction = 'up';
                sinon.spy(rendered.instance()._eat);
                _tick();
                expect(rendered.instance()._eat.calledOnce).to.equal(true); //possibly bad testing, since it relies on how _tick handles direction
                rendered.instance()._eat.restore(); //possibly unnecessary 
                //_tick computes next square
                //if next square is food
                    //call _eat
                //create a copy of state.snake
                //if state.snake.length < state.length
                    //unshift next square
                //else
                    //unshift next square, pop()
                //setState({snake: copy})
                //should consider breaking up tick into multiple components
            });
            it('calls this._gameOver when next pixel corresponds to an element of this.snake', ()=>{
               
            });
            it('first removes the tail of this.snake when length is reached', ()=>{
               
            });
           
        });
        describe('_pause', ()=>{
            it('sets this.paused to true', ()=>{
               
            });
            it('displays controls', ()=>{
               
            });
        });
        describe('_resume', ()=>{
            it('sets this.paused to false', ()=>{
               
            });
            it('calls this._tick', ()=>{
               
            });
            it('focuses on .board div', ()=>{
               
            });
            it('hides controls', ()=>{
               
            });
        });
        describe('_eat', ()=>{
            it('increases this.length by 1', ()=>{
               
            });
            it('sets a random empty pixel to be food', ()=>{
               
            });
            it('increases speed', ()=>{
               //by how much?
            });
        });
        describe('_handleKey', ()=>{
            it('handles up', ()=>{
               
            });
            it('handles down', ()=>{
               
            });
           
            it('handles left', ()=>{
               
            });
           
            it('handles right', ()=>{
               
            });
           
            it('does nothing when user enters opposite direction of this.direction', ()=>{
               
            });
           
            it('does nothing when user enters something besides an arrow', ()=>{
               
            });
            it('does nothing when paused', ()=>{
               
            });
        });
        describe('_gameOver', ()=>{
            
        });       
    });
    describe('event handling', ()=>{
        it('calls _handlekey on key down', ()=>{
            
        });
        it('calls _pause on blur', ()=>{
            
        });
        it('calls _resume on focus', ()=>{
            
        });
    });
});

