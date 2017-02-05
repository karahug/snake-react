import React from 'react';
import autoBind from 'react-autobind';
var KEYS = {38: 'up', 40: 'down', 37: 'left', 39: 'right', 32: 'space'};
var INITIAL_COORDINATES = [20,20];
var INITIAL_SPEED = 100;

class App extends React.Component{
    constructor(){
        super();
        autoBind(this);
        this.state = {snake: [INITIAL_COORDINATES], direction: 'none', length: 1, speed: INITIAL_SPEED};
    }
    
    
    componentDidMount(){
        this._tick();
    }
    _tick(){
        
        //callback
        switch(this.direction){
            case 'up':
                
            case 'down':
                
            case 'left':
            
            case 'right':
                
            default:
        }
        
        setTimeout(this._tick(), this.speed);
    }
    _pause(){
        
    }
    _handleKey(event){
        var key =  event.nativeEvent.keycode;
        if(KEYS[key] == 'space'){
            this._pause();
            return;
        }
        this.state.direction = KEYS[key] || this.state.key;
    }
    _eat(){
        
    }
    _resume(){
        this._tick();
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