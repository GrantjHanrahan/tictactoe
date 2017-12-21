// $(document).ready(function(){
//
// const singlePlayerGame = function(){
//   let player = 1;
//   let gameBoard = $('table');
//   let displayMessage = $('.endgame');
//
//   nextPlayerTurn(turn, player);
//
//   $('td').click(function() {
//     td = $(this);
//     let status = getStatus(td);
//       if( !status ) {
//         let pattern = currentPlayer(player);
//         changeStatus(td, pattern);
//         if( checkWinner(table, pattern) ){
//           displayMessage.html(`Player ${player} has won`);
//           turn.html('');
//         } else {
//           player = nextPlayer(player);
//           nextPlayerTurn(turn, player);
//         }
//       } else {
//         displayMessage.html('This box has already been checked');
//       }
//   });
//
//   $('#reset').click(function(){
//     player = 1;
//     displayMessage.html('');
//     reset(table);
//     nextPlayerTurn(turn, player);
//   });
//
//   function getStatus(td){
//     if( td.hasClass('cross') || td.hasClass('circle')){
//       return 1;
//     } else {
//       return 0;
//     }
//   }
//
//   function changeStatus(td, pattern){
//     return td.addClass(pattern);
//   }
//
//   function currentPlayer(player){
//     if( player == 1){
//       return 'cross';
//     } else {
//       return 'circle';
//     }
//   }
//
//   function nextPlayer(player){
//     if( player == 1){
//       return player = 2;
//     } else {
//       return player = 1;
//     }
//   }
//
// function nextPlayerTurn(turn, player){
//   turn.html(`Player turn: ${player}`);
// }
//
// function checkWinner(){
//
// }
//
// function reset(table){
//   table.find('td').each(function(){
//     $(this).removeClass('circle').removeClass('cross');
//   })
// }
//
// }
//
//
//
//
//
//
//
//
// })
