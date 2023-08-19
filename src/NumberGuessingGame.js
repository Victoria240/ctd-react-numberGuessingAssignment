import React, { useState } from "react";
import GuessControl from "./GuessControl";
import GuessMessage from "./GuessMessage";
import GameOver from "./GameOver";

// Function to get a random integer between 1 and 100
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

function NumberGuessingGame() {
  const MAX_ATTEMPTS = 5;

  // State variables and their setters
  const [numberToGuess, setNumberToGuess] = useState(getRandomNumber());
  const [numberOfGuesses, setNumberOfGuesses] = useState(0);
  const [latestGuess, setLatestGuess] = useState(null);

  // Function to handle a new guess
  const handleGuess = (guess) => {
    setLatestGuess(Number(guess)); // Convert the guess to a number and set latestGuess
    setNumberOfGuesses((prevGuesses) => prevGuesses + 1); // Increment the number of guesses
  };

  // Function to handle game reset
  const handleReset = () => {
    setNumberToGuess(getRandomNumber()); // Generate a new random number
    setNumberOfGuesses(0); // Reset the number of guesses
    setLatestGuess(null); // Reset the latest guess
  };

  // Check if the latest guess is correct or if the game is over
  const isCorrectGuess = latestGuess === numberToGuess;
  const isGameOver = isCorrectGuess || numberOfGuesses === MAX_ATTEMPTS;

  return (
    <div>
      <h2>I'm thinking of a number from 1 to 100.</h2>
      <h2>
        Can you guess the number I am thinking of in {MAX_ATTEMPTS} tries?
      </h2>
      {/* Render the GuessControl component and pass the handleGuess function */}
      <GuessControl onGuess={handleGuess} />
      {/* Render GameOver component if the game is over */}
      {isGameOver && (
        <GameOver hasWon={isCorrectGuess} onReset={handleReset} />
      )}
      {/* Render GuessMessage component if the game is still ongoing */}
      {!isGameOver && (
        <GuessMessage
          guess={latestGuess}
          numberToGuess={numberToGuess}
          numberOfGuesses={numberOfGuesses}
        />
      )}
    </div>
  );
}

export default NumberGuessingGame;
