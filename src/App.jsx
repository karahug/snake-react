import React from 'react';
import autoBind from 'react-autobind';
var KEYS = {38: 'up', 40: 'down', 37: 'left', 39: 'right'}
var INITIAL_COORDINATES = [20,20];

class App extends React.Component{
    constructor(){
        super();
        autoBind(this);
        this.state = {snake: [INITIAL_COORDINATES], direction: 'none', length: 1};
    }
    
    _tick(){
        
        //callback
        setTimeout(this._tick(), 33);
    }
    _pause(){
        
    }
    _unpause(){
        
    }
    _handleKey(event){
        var direction =  event.nativeEvent.keycode;
        this.state.direction = KEYS[direction] || this.state.direction
    }
    _eat(){
        
    }
    _resume(){
        
    }
    render(){
        return(
        <div className='board'
            onFocus = {this._resume}
            onBlur = {this._pause}
            onKeyDown = {this._handleKey}
        >
            
        </div>
        );
    }
}

export default App;