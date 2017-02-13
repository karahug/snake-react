import React from 'react';
//import autoBind from 'react-autobind';
var KEYS = {38: 'up', 40: 'down', 37: 'left', 39: 'right', 32: 'space'};
var INITIAL_COORDINATES = [10,10];
var INITIAL_SPEED = 5;
const INITIAL_LENGTH = 5;
const BOARD_SIZE = 20;
class App extends React.Component{
    constructor(){
        super();
        //autoBind(this);
        this.state = {snake: [INITIAL_COORDINATES], food: randomOpenSquare([INITIAL_COORDINATES]), direction: null, paused: false, speed: INITIAL_SPEED, snakeLength: INITIAL_LENGTH, inputDirection: null, gameOver: false};
        this._tick = this._tick.bind(this);
        this._pause = this._pause.bind(this);
        this._resume = this._resume.bind(this);
        this._handleKey = this._handleKey.bind(this);
        this._reset = this._reset.bind(this);
    }
    
    
    componentDidMount(){
        this.board.focus();
        this._tick(this._tick);
    }
    _tick(callback){
        if(!this.state.paused && !this.state.gameOver){
            const timeOutPromise = new Promise((resolve, reject)=>{setTimeout(()=>{resolve()}, Math.floor(1000/this.state.speed))});
            const setStatePromise = new Promise((resolve, reject)=>{
                //creating local state variables so we can do one setState
                var food = this.state.food.slice();
                var speed = this.state.speed;
                const snake = this.state.snake.slice();
                var length = this.state.snakeLength;
                var direction = resolveDirection(this.state.inputDirection, this.state.direction);
                //get nextSquare and resolve(don't change state) if it's null
                //really this should only happen when direction is null i.e. at the beginning of a game
                const nextSquare = getNextSquare(snake, direction);
                if(!nextSquare){
                    resolve();
                }
                //gameOver if nextSquare is in snake 
                if(compareCoordinates(nextSquare, food)){
                    length++;
                    food = randomOpenSquare(snake.concat([food]));
                    //increase speed
                    speed++; 
                }
                
                if(snake.length === this.state.snakeLength){
                    snake.shift();
                }
                
                if(snake.reduce(function(a,b){
                    return a || compareCoordinates(b, nextSquare);
                }, false)){
                    this.setState({gameOver: true}, resolve());
                } else {
                    snake.push(nextSquare);
                    this.setState({snake: snake, food: food, speed: speed, snakeLength: length, direction: direction}, resolve());
                }
            });
            //use Promise.all perhaps to make sure that setState finishes before next _tick() is called
            return Promise.all([timeOutPromise, setStatePromise]).then(()=>{callback(callback)});    
        }
    }
    _pause(){
        this.setState({paused: true});
        this.board.blur();
    }
    _handleKey(event){
        var key =  event.nativeEvent.keyCode;
        if(KEYS[key] == 'space'){
            this._pause();
            return;
        }
        const inputDirection = KEYS[key] || this.state.inputDirection;
        if(inputDirection != this.state.direction && resolveDirection(inputDirection, this.state.direction) != this.state.direction){
            this.setState({inputDirection: inputDirection});
        }
    }
 
    _resume(){
        this.setState({paused: false},()=>{
            this.board.focus();
            this._tick(this._tick);
        });
        
    }
    
    _reset(){
        this.setState({snake: [INITIAL_COORDINATES], food: randomOpenSquare([INITIAL_COORDINATES]), direction: null, paused: false, speed: INITIAL_SPEED, snakeLength: INITIAL_LENGTH, inputDirection: null, gameOver: false},()=>{
            this.board.focus();
            this._tick(this._tick);
        });
        
    }
    render(){
        return(
        <div className="wrapper">
            <div className='board'
                tabIndex="0"
                onBlur={this._pause}
                onKeyDown={this._handleKey}
                ref={(board)=>{this.board = board}} //set refs so we can call this.board.focus in this._resume()
            >
                {createSquaresArray(this.state.snake, this.state.food)}
            </div>
            <div className={'controls' + ((this.state.paused || this.state.gameOver) ? '':' hidden')}>
                <button className={this.state.gameOver ? 'restart': 'restart hidden'} type="button" onClick={this._reset}>Restart</button>
                <button className={(this.state.paused && !this.state.gameOver) ? 'resume' : 'resume hidden'} type="button" onClick={this._resume}>Resume</button>
            </div>
        </div>
        );
    }
}



function randomOpenSquare(snake){
    var openSquareCount = Math.pow(BOARD_SIZE,2) - snake.length; // 20 is how many squares in each row/column
    var randomSquareIndex = Math.floor(Math.random() * openSquareCount);
    const openSquares = [];
    for(let i = 0; i < BOARD_SIZE; i++){
        for(let j = 0; j < BOARD_SIZE; j++){
            if(!snake.reduce((a,b)=>{return a || (i == b[0] && j == b[1])}, false)){
                openSquares.push([i,j]);
            }
        }
    }
    return openSquares[randomSquareIndex];
}

function getNextSquare(snake, direction){
    const head = snake[snake.length - 1];
    const directionMap = new Map([['up', [-1,0]], ['down', [1,0]], ['right', [0,1]], ['left', [0,-1]]]);
    const transformation = directionMap.get(direction);
    if(transformation){
        var nextSquare = head.map((x,i)=>{ return x + transformation[i]});
        nextSquare = nextSquare.map((x)=>{return (BOARD_SIZE + x) % BOARD_SIZE});
        return nextSquare;
    }
}

function getSquareIndex(coordinates){
    return coordinates[0] * BOARD_SIZE + coordinates[1];
}

function getCoordinates(index){
    return [Math.floor(index / BOARD_SIZE), index % BOARD_SIZE];
}

//not very DRY
function resolveDirection(inputDirection, direction){
    switch(direction){
        case 'up':
            return inputDirection != 'down' ? inputDirection : direction;
        case 'down':
            return inputDirection != 'up' ? inputDirection : direction;
        case 'left':
            return inputDirection != 'right' ? inputDirection : direction;
        case 'right':
            return inputDirection != 'left' ? inputDirection : direction;
        default:
            return inputDirection;
    }
}

function compareCoordinates(a,b){
    return a.every((x,i)=>{return x == b[i]});
}
function isElementOf(element, snake){
    return snake.reduce((a,b)=>{return a || compareCoordinates(b, element)}, false);
}

function createSquaresArray(snake, food){
    var squares = [];
    for(let i = 0; i < Math.pow(BOARD_SIZE,2); i++){
        const coordinates = getCoordinates(i);
        var c;
        if(compareCoordinates(food, coordinates)){
            c = 'square food';
        } else if(isElementOf(coordinates, snake)){
            c = 'square snake';
        } else {
            c = 'square';
        }
        squares.push(<div className={c} key={i} />);
    }
    return squares;
}


export default App;