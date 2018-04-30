
let p1Score = localStorage.getItem('p1ScoreSave') || 0;
let p2Score = localStorage.getItem('p2ScoreSave') || 0;
p1Score = parseInt(p1Score);
p2Score = parseInt(p2Score);

$(document).ready(function(){
$("#mario_audio1").get(0).play();

console.log('Tic Tac Toe revision');

const player1 = 'X';
const player2 = 'O';
let Turn = player1;
let totalMoves = 0;
let gameIsOver = false;
const $cells = $('.cell');
let startBoard;

const square0 = $('#0');
const square1 = $('#1');
const square2 = $('#2');
const square3 = $('#3');
const square4 = $('#4');
const square5 = $('#5');
const square6 = $('#6');
const square7 = $('#7');
const square8 = $('#8');



$('#turnMessage').css('display', 'none');
$('#playAgain1P').css('display', 'none');
$('#playAgain2P').css('display', 'none');//added a second playAgain button to prevent an issue where the 1 player game would run after selecting play again in 2 player mode.

const onePlayerGame = function(){
  $('#p1Score').html(`Player X Score: ${p1Score}`);
  $('#p2Score').html(`Player O Score: ${p2Score}`);


  $('#playAgain1P').on('click', onePlayerGame).css('display', 'block');
  $('#1P').css('background', 'orangered').css('display', 'block');
  $('#playAgain2P').css('display', 'none');
  $('#2P').css('display', 'none');

  $('#turnMessage').css('display', 'block');
  $('#turnMessage').html(`Player turn: ${player1}`);

  startBoard = Array.from(Array(9).keys());//creates a new array of 9 elements

  for (let i = 0; i < $cells.length; i++) {
    $cells[i].innerText = ''  ;
    $cells[i].style.removeProperty('background-color');
    $cells[i].addEventListener('click', turnClick);//removed false
  }
  gameIsOver = false;
}

const turnClick = function(square){// this function can be called with eithr the human or ai player

if( typeof startBoard[square.target.id] === 'number'){//cannot select an already selected square

  turn(square.target.id, player1);
  $('#turnMessage').css('display', 'block');
  $('#turnMessage').html(`Player turn: ${player2}`);
  totalMoves++;

    if( !gameIsOver && !tiedGame() ){

    setTimeout(function(){
      $('#turnMessage').css('display', 'block');
      $('#turnMessage').html(`Player turn: ${player1}`);
      totalMoves++;
      turn(aiMove(), player2)

    },800);
    }
  }
}

const turn = function(squareId, player){
  startBoard[squareId] = player;//show player that took turn on the square id
  document.getElementById(squareId).innerText = player;
  tiedGame();
  checkWin();
}

const aiMove = function(){
  return emptySquares()[0];
}

const emptySquares = function(){
  return startBoard.filter(function(squareElement){
    return typeof squareElement === 'number';//filter all elements of the board, the elements that are equal to a number have not been selected yet and can be played into by the ai
  });
}

////////one player game only

const twoPlayerGame = function(){
  $('#p1Score').html(`Player X Score: ${p1Score}`);
  $('#p2Score').html(`Player O Score: ${p2Score}`);


  $('.endgame').css('display', 'none');
  $('#2P').css('background', 'orangered').css('display', 'block');
  $('#playAgain1P').css('display', 'none');
  $('#playAgain2P').on('click', twoPlayerGame).css('display', 'block')
  $('#1P').css('display', 'none');

  $('#turnMessage').css('display', 'block');
  $('#turnMessage').html(`Player turn: ${Turn}`);

  $cells.on('click', function(){
    twoPlayer = true;
    if($(this).html() === ''){
      $(this).html(Turn);
    } else {
      return;
    }

    if( Turn === player1){
      Turn = player2;
      totalMoves++;
      $('#turnMessage').css('display', 'block');
      $('#turnMessage').html(`Player turn: ${player2}`);
    }
    else if ( Turn === player2 ){
      Turn = player1;
      totalMoves++;
      $('#turnMessage').css('display', 'block');
      $('#turnMessage').html(`Player turn: ${player1}`);
    }
    tiedGame();
    checkWin();
  })
  gameIsOver = false;
};

const checkWin = function(){
let p1Win = 'Player 1 Wins!!';
let p2Win = 'Player 2 Wins!!';
let gameWon = '';
  if( !gameIsOver ){//add !tiedGame
    if( square0.html() === 'X' && square1.html() === 'X' && square2.html() === 'X'
    || square3.html() === 'X' && square4.html() === 'X' && square5.html() === 'X' || square6.html() === 'X' && square7.html() === 'X' && square8.html() === 'X' || square0.html() === 'X' && square3.html() === 'X' && square6.html() === 'X' || square1.html() === 'X' && square4.html() === 'X' && square7.html() === 'X' || square2.html() === 'X' && square5.html() === 'X' && square8.html() === 'X' || square0.html() === 'X' && square4.html() === 'X' && square8.html() === 'X' || square6.html() === 'X' && square4.html() === 'X' && square2.html() === 'X'){
      gameIsOver = true;
      gameWon = p1Win;
      p1Score++;
      localStorage.setItem('p1ScoreSave', p1Score);
      // $('#p1Score').html(`Player X Score: ${p1Score}`);
      console.log(p1Score);
      $('#turnMessage').css('display', 'none');
      gameOver(gameWon);
      $("#mario_audio1").get(0).pause();
      $("#mario_audio2").get(0).play();
    }
    else if( square0.html() === 'O' && square1.html() === 'O' && square2.html() === 'O'
    || square3.html() === 'O' && square4.html() === 'O' && square5.html() === 'O' || square6.html() === 'O' && square7.html() === 'O' && square8.html() === 'O' || square0.html() === 'O' && square3.html() === 'O' && square6.html() === 'O' || square1.html() === 'O' && square4.html() === 'O' && square7.html() === 'O' || square2.html() === 'O' && square5.html() === 'O' && square8.html() === 'O' || square0.html() === 'O' && square4.html() === 'O' && square8.html() === 'O' || square6.html() === 'O' && square4.html() === 'O' && square2.html() === 'O' ){
      gameIsOver = true;
      gameWon = p2Win;
      p2Score++;
      localStorage.setItem('p2ScoreSave', p2Score);
      // $('#p2Score').html(`Player O Score: ${p2Score}`);
      console.log(p2Score);
      $('#turnMessage').css('display', 'none');
      gameOver(gameWon);
      $("#mario_audio1").get(0).pause();
      $("#mario_audio2").get(0).play();
    }

  }//if !gameIsOver
  return gameWon;
}//checkWin

const gameOver = function(gameWon){
  gameIsOver = true;
  $cells.off('click');

  declareWinner(gameWon);
}

const declareWinner = function(winner){
  $(".endgame").css('display', 'block');
  $(".endgame .text").html(winner);
}

const resetGame = function(){
  $("#mario_audio3").get(0).pause();
  $("#mario_audio2").get(0).pause();
  $("#mario_audio1").get(0).play();

  gameIsOver = false;
  totalMoves = 0;
  p1Score = 0;
  p2Score = 0;
  localStorage.removeItem('p1ScoreSave')
  localStorage.removeItem('p2ScoreSave')
  $('#p1Score').html('');
  $('#p2Score').html('');
  $('.endgame').css('display', 'none');
  $('#turnMessage').css('display', 'none');
  $('#playAgain1P').css('display', 'none');
  $('#playAgain2P').css('display', 'none');
  $('#1P').css('display', 'block').css('background', 'lightgreen');
  $('#2P').css('display', 'block').css('background', 'lightgreen');
  for( let i = 0; i < $cells.length; i++){
    $cells[i].innerText = '';
  }
  // $('.cell').html() = '';
}

const playAgain = function(){
  $("#mario_audio3").get(0).pause();
  $("#mario_audio2").get(0).pause();
  $("#mario_audio1").get(0).play();

  gameIsOver = false;
  totalMoves = 0;
  $('.endgame').css('display', 'none');
  $('#turnMessage').css('display', 'none');
  for( let i = 0; i < $cells.length; i++){
    $cells[i].innerText = '';
  }
}

const tiedGame = function(){
  let tie = 'Game Tied!'
    if( totalMoves === 9){
      declareWinner(tie);
      $("#mario_audio1").get(0).pause();
      $("#mario_audio3").get(0).play();
    }

  }

$('#1P').on('click',onePlayerGame);
$('#2P').on('click', twoPlayerGame);
$('#playAgain1P').on('click', playAgain);
$('#playAgain2P').on('click', playAgain);
$('#reset').on('click', resetGame);


})
