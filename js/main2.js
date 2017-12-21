
$(document).ready(function(){
  $("#mario_audio1").get(0).play();

let startBoard;
const player1 = 'X';
const player2 = 'O';

let gameIsOver = false;

const $cells = $('.cell');

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2]
]

$('#1P').on('click', singlePlayerGame)

function singlePlayerGame(){
$('#2P').css('display', 'none');
$("#mario_audio1").get(0).pause();

$('#reset').on('click', startGame);

startGame();

// const startGame = function(){
function startGame(){
  $('.endgame').css('display', 'none');//win/ lose display message
  $("#mario_audio2").get(0).play();
  $("#mario_audio3").get(0).pause();

  startBoard = Array.from(Array(9).keys());//creates a new array of 9 elements

  for (let i = 0; i < $cells.length; i++) {
    $cells[i].innerText = '';//make innerText of every cell empty
    $cells[i].style.removeProperty('background-color');
    $cells[i].addEventListener('click', turnClick);//removed false
  }
  gameIsOver = false;
}

function turnClick(square){// this function can be called with eithr the human or ai player
if( typeof startBoard[square.target.id] == 'number'){//cannot select an already selected square
  turn(square.target.id, player1);
    if( !gameIsOver && !checkForTie()  ){

    setTimeout(function(){
      turn(bestSpot(), player2)

      },600);
    }
  }
}

function turn(squareId, player){
  startBoard[squareId] = player;//show player that took turn on the square id
  document.getElementById(squareId).innerText = player;

  let gameWon = checkWin(startBoard, player);
  if (gameWon) gameOver(gameWon) //if game has been won call gameOver function
}

function checkWin(board, player){
  let plays = board.reduce((boardArray,boardElement,squareIndex) =>
    (boardElement === player) ? boardArray.concat(squareIndex) : boardArray, []);
    // reduce will go through every element in the board array
    // It will then return a single value, the accumulator (boardArray)
    // The accumulator is then initialized to an empty Array
    // boardElement = the element in the board array being iterated through
    // squareIndex = the index of every square the player has played in

    // If the boardArray element equals the player, then the index is concattenated to the boardArray
    //If the element does not equal the player, the boardArray is returned as it was
  let gameWon = null;

  for (let [index, win] of winningCombos.entries()){//loop through every win combo to see if the game has been won
    if( win.every(winElement => plays.indexOf(winElement) > -1)){//check if the player has played in all of the array spots that count as a win
      gameWon = {index, player};
      break;
    }
  }
  return gameWon;
}

function gameOver(gameWon){

  gameIsOver = true;

  for ( let index of winningCombos[gameWon.index]){
    document.getElementById(index).style.backgroundColor =
    gameWon.player == player1 ? "inherit" : "inherit" ;

  }
  for (let i = 0; i < $cells.length; i++) {
    $cells[i].removeEventListener('click', turnClick, false);
  }
  declareWinner( gameWon.player === player1 ? "You win!" : "You lose!");

  $("#mario_audio2").get(0).pause();
  $("#mario_audio3").get(0).play();
}

function declareWinner(who){
  $(".endgame").css('display', 'block');
  $(".endgame .text").text(who);
}

function bestSpot(){
  return emptySquares()[0];
}

function emptySquares(){
  // return startBoard.filter( s => typeof s == 'number');
  return startBoard.filter(function(squareElement){
    return typeof squareElement === 'number';//filter all elements of the board, the elements that are equal to a number have not been selected yet and can be played into by the ai
  });
}

function checkForTie(){
  if( emptySquares().length === 0){
    for (let i = 0; i < $cells.length; i++) {
      $cells[i].style.backgroundColor = "inherit";
      $cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner('Tied Game');
    return true;
  }
  return false;
}

}

});
