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
                    expect(rendered.state('speed')).to.equal(10);
                });
                
                it('sets initial length = 2', ()=>{
                    expect(rendered.state('length')).to.equal(2);
                });
            });
        });
        
    });
    
    describe('component methods', ()=>{
        describe('_tick', ()=>{ 
            const rendered = shallow(<App />);
            const _tick = rendered.instance()._tick;
            describe('when gameOver and paused are false', ()=>{
                describe('when snake.length and length are equal', ()=>{
                    describe('when the next square is empty', ()=>{
                        describe('in the middle of the board', ()=>{
                            const rendered = shallow(<App />);
                            const _tick = rendered.instance()._tick;
                            const setState = rendered.setState;
                            const state = rendered.instance().state;
                            it('adds the correct square to snake', ()=>{
                                const snake = [[10,10], [9,10]];
                                const direction = 'up';
                                rendered.setState({direction: direction, snake: snake}, ()=>{
                                    rendered.instance()._tick(()=>{return Promise.resolve()}).then(()=>{expect(rendered.instance().state.snake).to.eql([[10,10],[9,10],[8,10]]);});
                                });
                            });
                        });
                        describe('on the edge of the board', ()=>{
                            it('adds the correct square to snake', ()=>{
                                
                            });
                        });
                    });
                    describe('when the next square is food', ()=>{
                        it('increments length state', ()=>{
                            
                        });
                    });
                    describe('when the next square is an element of snake', ()=>{
                        it('sets gameOver state to true', ()=>{
                            
                        });
                    });
                    
                    describe('when input direction is opposite of direction', ()=>{
                        it('leaves direction the same', ()=>{
                            
                        });
                    });
                    
                });
                describe('when snake.length is less than length', ()=>{
                    it('increases snake.length by 1', ()=>{
                        
                    });
                });
                
                describe('when next square is food', ()=>{
                    it('increases length', ()=>{
                        
                    });
                    it('sets a random open square to food', ()=>{
                        
                    });
                });
                describe('when next square in snake', ()=>{
                    it('sets gameOver to true', ()=>{
                        
                    });
                });
                
            });
            
        }); 
        describe('_pause', ()=>{
            it('sets this.paused to true', ()=>{
               
            });
            it('blurs .board div', ()=>{
               
            });
        });
        describe('_resume', ()=>{
            it('sets this.paused to false', ()=>{
               
            });
            it('calls this._tick', ()=>{
               
            });
            it('focuses on .board div', ()=>{
               
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
        describe('_reset', ()=>{
            
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

