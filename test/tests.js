import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import App from '../src/App.jsx';

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
            it('calls componentDidMount()', ()=>{
                expect(App.prototype.componentDidMount.calledOnce).to.equal(true);
            });
            it('ticks', ()=>{
                expect(App.prototype._tick.called).to.equal(true);
                App.prototype._tick.restore();
                App.prototype.componentDidMount.restore();
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
        var rendered;
        beforeEach(()=>{
            rendered = shallow(<App />);
        });
        describe('_tick', ()=>{ 
            //will run _tick 10 times when sinon.spy used in lifecycle testing
            //but test will still pass when the component works
           var rendered = shallow(<App />);
           rendered.instance().state.paused = true; // pass when paused is true, fail when paused is false
            it("doesn't call _tick again when paused", ()=>{
                var _tick = rendered.instance()._tick;
                return Promise.race([
                    new Promise(function(resolve, reject){
                        setTimeout(function(){
                            resolve(1);
                        }, 1000);
                    }),
                    new Promise(function(resolve, reject){
                        _tick(function(){
                            resolve(2);
                        });
                    })
                ]).then(function(x){
                    expect(x == 1 ? '_tick did not run again':'_tick ran again').to.equal('_tick did not run again');
                });
            
              
           });
           it('sets a pixel in the correct direction to snake', ()=>{
               
           });
           it('calls this._eat when the next pixel is food', ()=>{
               
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

