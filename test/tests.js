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
               expect(rendered.find('.square')).to.have.length(400);
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
                    expect(rendered.state('snakeLength')).to.equal(2);
                });
            });
        });
        
    });
    
    describe('component methods', ()=>{
        var rendered;
        var state;
        var setState;
        var instance;
        beforeEach(()=>{
            rendered = shallow(<App />);
            instance = rendered.instance();
            state = instance.state;
            setState = instance.setState.bind(instance); // setState creates a new object and sets state to it
        });
        describe('_tick', ()=>{
            //should test in order by paused/gameover => direction => nextSquare
            var _tick;
            var getTickPromise;
            beforeEach(()=>{
                _tick = instance._tick.bind(instance);
                getTickPromise = function(state){
                    return new Promise((resolve, reject)=>{
                        setState(state, ()=>{
                            _tick(()=>{}).then(()=>{
                                resolve(instance.state);
                            });
                        });
                    });
                };
            });

            describe('when gameOver and paused are false', ()=>{
                describe('when snake.length and length are equal', ()=>{
                    describe('when the next square is empty', ()=>{
                        describe('in the middle of the board', ()=>{
                            it('adds the correct square to snake', ()=>{
                                const snake = [[10,10], [9,10]];
                                const food = [0,0];
                                const direction = 'up';
                                //return promise
                                return getTickPromise({snake: snake, food: food, inputDirection: direction}).then((state)=>{
                                    expect(state.snake).to.eql([[9,10],[8,10]]);
                                });
                            });
                        });
                        describe('on the edge of the board', ()=>{
                            it('adds the correct square to snake', ()=>{
                                const snake = [[0,0]];
                                const direction = 'up';
                                const food = [10, 10];
                                return getTickPromise({snake: snake, inputDirection: direction, food: food}).then((state)=>{
                                    expect(state.snake).to.eql([[0,0], [19,0]]);
                                });
                            });
                        });
                    });
                    describe('when the next square is food', ()=>{
                        it('increments length state', ()=>{
                            return getTickPromise({food:[9,10], inputDirection: 'up'}).then((state)=>{
                                expect(state.snakeLength).to.equal(3);
                            });
                        });
                        it('sets a new food square correctly', ()=>{
                            return getTickPromise({food:[9,10], inputDirection: 'up'}).then((state)=>{
                                expect(state.food).is.not.eql([9,10]);
                                expect(state.food).is.not.eql([10,10]);
                            });
                        })
                    });
                    describe('when the next square is an element of snake', ()=>{
                        it('sets gameOver state to true', ()=>{
                            return getTickPromise({snake:[[10,10], [9,10],[9,11], [10,11]], snakeLength:5, inputDirection: 'left', food: [0,0]}).then((state)=>{
                                expect(state.gameOver).to.equal(true);
                            });
                        });
                    });
                    
                    describe('when input direction is opposite of direction', ()=>{
                        it('leaves direction the same', ()=>{
                            return getTickPromise({direction:'up', inputDirection: 'down', food:[0,0]}).then((state)=>{
                                expect(state.direction).to.equal('up');
                                expect(state.snake).to.eql([[10,10], [9,10]]);
                            });
                        });
                    });
                    
                });
                describe('when snake.length is less than length', ()=>{
                    it('increases snake.length by 1', ()=>{
                        return getTickPromise({inputDirection: 'up', food: [0,0]}).then((state)=>{
                            expect(state.snake.length).to.equal(2);
                        });
                    });
                });
                
            });
            
        }); 
        describe('_pause', ()=>{
            it('sets state.paused to true', ()=>{
               instance._pause();
               expect(instance.state.paused).to.equal(true);
            });
            it('blurs .board div', ()=>{
               
            });
        });
        describe('_resume', ()=>{
            beforeEach(()=>{
                setState({paused: true});
            });
            it('sets this.paused to false', ()=>{
                sinon.stub(instance, '_tick');
                instance._resume();
                expect(instance.state.paused).to.equal(false);
            });
            it('calls this._tick', ()=>{
                sinon.stub(instance, '_tick');
                instance._resume();
                expect(instance._tick.called).to.equal(true);
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

