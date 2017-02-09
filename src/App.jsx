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
        this._gameOver = this._gameOver.bind(this);
    }
    
    
    componentDidMount(){
        this._tick(this._tick);
    }
    _tick(callback){
        console.log(this.state.paused);
        if(!this.state.paused){
            console.log(new Error().stack);
            setTimeout(callback, this.state.speed, callback );
        }
        switch(this.state.direction){
            case 'up':
                
            case 'down':
                
            case 'left':
            
            case 'right':
                
            default:
        }
    }
    _pause(){
        this.setState({paused: true});
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
        this.setState({paused: false});
        this._tick(this._tick);
    }
    
    _gameOver(){
        
    }
    render(){
        return(
        <div className='board'
            onBlur = {this._pause}
            onKeyDown = {this._handleKey}
            ref={(board)=>{this.board = board;}} //set refs so we can call this.board.focus in this._resume()
        >
            
        </div>
        );
    }
}

export default App;