// ⭐️ Example Challenge START ⭐️

/**
 * ### Challenge `processFirstItem`
 * 
 * @instructions
 * Implement a higher-order function called `processFirstItem`.
 * It takes two arguments:
 * @param stringList an array of strings.
 * @param callback function that takes a string as its argument.
 * @returns the result of invoking `callback` with the FIRST element in `stringList`.
 * 
 * Example of usage of this higher-order function:
 * Invoking `processFirstItem` passing `['foo', 'bar']` and `(str) => str + str`,
 * should return 'foofoo'.
*/
function processFirstItem(stringList, callback) {
  return callback(stringList[0])
}

// ⭐️ Example Challenge END ⭐️


///// M V P ///////

/* Task 1: `counterMaker`
 * Study the code for counter1 and counter2. Answer the questions below.
 * 
 * 1. What is the difference between counter1 and counter2?
 *   
 *     counter1 returns a function, count 2 returns a value which is a number count;    
 * 
 * 2. Which of the two uses a closure? How can you tell?
 * 
 *    counter 1 uses a closure because the return value is a function
 * 
 * 3. In what scenario would the counter1 code be preferable? In what scenario would counter2 be better? 
 *     
 *   counter 1 is preferable when you want to track the count when you do multiple calls.
 *   counter 2 is better when you just want to do single one time count, no more extra memory needed to 
 *   track the count value.
 *
*/

// counter1 code
function counterMaker() {
  let count = 0;
  return function counter() {
    count++;
  }
}

const counter1 = counterMaker();

// counter2 code
let count = 0;

function counter2() {
  return count++;
}


/* Task 2: inning() 

Write a function called `inning` that generates a random number of points 
that a team scored in an inning. This should be a whole number between 0 and 2. */

function inning(game){
  let points=0;

  return function win(){
    points=points+ Math.floor(Math.random()*3);
    return points;
  };
}

const game1= inning('round1');
console.log('Task2');
console.log(`Your round1's score is ${game1()}`);
console.log(`Your round1's score is ${game1()}`);

/* Task 3: finalScore()

Write a higher order function called `finalScore` that accepts the callback function `inning` (from above)
 and a number of innings and and returns the final score of the game in the form of an object.

For example, 

finalScore(inning, 9) might return: 
{
  "Home": 11,
  "Away": 5,
}

*/ 

function finalScore(callback, number){

  const home=callback('game1');
  const away=callback('game1');
  let homeScore=0;
  let awayScore=0;

  for(let i=0;i<number; i++){
    homeScore=home();
    awayScore=away();
  }
  
  return {Home: homeScore, Away:awayScore};

}
console.log('Task3');
console.log(finalScore(inning, 9)) ;
/* Task 4: 

Create a function called `scoreboard` that accepts the following parameters: 

(1) Callback function `getInningScore`
(2) Callback function `inning`
(2) A number of innings

and returns the score at each pont in the game, like so:

1st inning: awayTeam - homeTeam
2nd inning: awayTeam - homeTeam
3rd inning: awayTeam - homeTeam
4th inning: awayTeam - homeTeam
5th inning: awayTeam - homeTeam
6th inning: awayTeam - homeTeam
7th inning: awayTeam - homeTeam
8th inning: awayTeam - homeTeam
9th inning: awayTeam - homeTeam

Final Score: awayTeam - homeTeam */

function getInningScore(cb){
  
  const homePoints=cb('1InningHome');
  const awayPoints=cb('1InningAway');
  
  return [awayPoints(),homePoints()];

}

function scoreboard(getScore,innings,number) {
  /* CODE HERE */
  let result=[];
  let finalHome=0;
  let finalAway=0;
   
  for(let i=0;i<number;i++){
   let score=getScore(innings);
   result.push(`${i+1}th inning: ${score[0]} - ${score[1]}`);
   finalAway=finalAway+score[0];
   finalHome=finalHome+score[1];
  }

  result.push("");
  result.push(`Final Score: ${finalAway} - ${finalHome}`);
 
  for(let i=0;i<result.length;i++){
    console.log(result[i]);
  }
  
}
console.log('Task4');
scoreboard(getInningScore,inning,9);

/*strech
1. Predict the output of the code below and explain why this is the output using what you learned today. When you're ready for answers, view an explanation [here](https://www.coderbyte.com/algorithm/3-common-javascript-closure-questions

```js
(function(){
  var a = b = 3;
})();
console.log("a defined? " + (typeof a !== 'undefined'));
console.log("b defined? " + (typeof b !== 'undefined'));

Answer: the output will be a undefined , b defined.
because var a=b=3  equals to var a=(b=3).
The var only applies to a , and b is global
a is function level scoped , so when it is referenced outside the function , it is undefined.
b is global, so it is defined and the value is 3.

*/