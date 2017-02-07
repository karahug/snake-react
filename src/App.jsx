import React from 'react';
//import autoBind from 'react-autobind';
var KEYS = {38: 'up', 40: 'down', 37: 'left', 39: 'right', 32: 'space'};
var INITIAL_COORDINATES = [10,10];
var INITIAL_SPEED = 100;

class App extends React.Component{
    constructor(){
        super();
        //autoBind(this);
        this.state = {snake: [INITIAL_COORDINATES], direction: null, length: 2, speed: INITIAL_SPEED, paused: false};
        this._tick = this._tick.bind(this);
        this._pause = this._pause.bind(this);
        this._resume = this._resume.bind(this);
        this._handleKey = this._handleKey.bind(this);
        this._eat = this._eat.bind(this);
    }
    
    
    componentDidMount(){
        this._tick();
    }
    _tick(){
        switch(this.direction){
            case 'up':
                
            case 'down':
                
            case 'left':
            
            case 'right':
                
            default:
        }
        if(!this.paused){
            setTimeout(this._tick, this.speed);
        }
    }
    _pause(){
        this.paused = true;
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
        this.paused = false;
        this._tick();
    }
    render(){
        return(
        <div className='board'
            onFocus = {this._resume}
            onBlur = {this._pause}
            onKeyDown = {this._handleKey}
            refs={(board)=>{this.board = board;}} //set refs so we can call this.board.focus in this._resume()
        >
            
        </div>
        );
    }
}

export default App;