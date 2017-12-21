
$(document).ready(function(){
  $("#mario_audio1").get(0).play();

let startBoard;
const player1 = 'X';
const player2 = 'O';

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

function startGame(){
  $('.endgame').css('display', 'none');//win/ lose display message
  $("#mario_audio2").get(0).play();
  $("#mario_audio3").get(0).pause();

  startBoard = Array.from([0,1,2,3,4,5,6,7,8]);
  // making the array be every number from 0 - 9, will create an array of 9 elements. Will provide the keys for that element which is 0 to 9.
  for (let i = 0; i < $cells.length; i++) {
    $cells[i].innerText = '';//make innerText of every cell empty
    $cells[i].style.removeProperty('background-color');
    $cells[i].addEventListener('click', turnClick);//removed false
  }
}

function turnClick(square){// this function can be called with eithr the human or ai player
if( typeof startBoard[square.target.id] == 'number'){

  turn(square.target.id, player1);
    if( !checkForTie()){
    turn(bestSpot(), player2)
    }
  }
}

function turn(squareId, player){
  startBoard[squareId] = player;//show player that took turn on the square id
  document.getElementById(squareId).innerText = player;

  let gameWon = checkWin(startBoard, player);
  if (gameWon) {
    gameOver(gameWon)
  }
}

function checkWin(board, player){
  let plays = board.reduce((accumuator,element,index) =>//board is the array being reduced
    (element === player) ? accumuator.concat(index) : accumuator, []);
    // if( element === player ){
    //   accumuator.concat(index);
    // } else {
    //   accumuator, [];
    // }

    //reduce method - will go through every element on the board array. Will then give back one single value - the accumulator. The accumulator will then be initialized to an empty array. 'e' is the element. 'i' is the index. If the element equals the player - ternary operator line. Taking the accumulator array and adding the index to the array, then if the index does not equal the player, the accumuator will be returned as it was (nothing will be added). This process will find every index that the player has played in.
  let gameWon = null;

  for (let [index, win] of winningCombos.entries()) {//loop through every win combo
    if( win.every(elem => plays.indexOf(elem) > -1)){
      gameWon = {index: index, player: player};
      break;
    }
  }
  return gameWon;
}

function gameOver(gameWon){
  for ( let index of winningCombos[gameWon.index]){
    if( gameWon.player == player1){
      document.getElementById(index).style.backgroundColor = "inherit";
    } else {
      document.getElementById(index).style.backgroundColor = "inherit";
    }
  }
  for (let i = 0; i < $cells.length; i++) {
    $cells[i].removeEventListener('click', turnClick, false);
  }
  if( gameWon.player == player1){
    declareWinner("You win!")
  } else {
    declareWinner("You lose!")
  }

  // declareWinner(gameWon.player == player1 ? "You win!" : "You lose!");
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
  return startBoard.filter( s => typeof s == 'number');
}

function checkForTie(){
  if( emptySquares().length == 0){
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

})
