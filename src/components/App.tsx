import { useCallback, useEffect, useState } from "react";
import { HangmanDessin } from "./HangmanDessin";
import { HangmanMots } from "./HangmanMots";
import { Keyboard } from "./HangmanKeyboard";
import "../css/App.css"

function App() {

  const [wordToGuess, setWordToGuess] = useState<string>("");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);


  // Calcul des lettres incorrectes en filtrant les lettres déjà trouvées qui ne sont pas incluses dans le mot à deviner.
  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 6; // car l'homme mort à 6 membres
  const isWinner = wordToGuess.split("").every((letter) => guessedLetters.includes(letter));


  // ajoute une lettre devinée, en vérifiant d'abord si le jeu est terminé.
  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;

      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isWinner, isLoser]
  );


  // Appel API
  useEffect(() => {
    const fetchWord = async () => {
      try {
        const response = await fetch("https://node-hangman-api-production.up.railway.app/", {
          method: "POST",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch word");
        }

        const data = await response.json();
        setWordToGuess(data.word);
      } catch (error) {
        console.error("Error fetching word:", error);
      }
    };

    fetchWord();
  }, []);

  // Utilisation de useEffect pour écouter les pressions de touche et appeler addGuessedLetter lorsqu'une lettre est pressée.
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handleKeyPress);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [guessedLetters, addGuessedLetter]);

  useEffect(() => {
    const handleEnterPress = (e: KeyboardEvent) => {
      const key = e.key;
      if (key !== "Enter") return;

      e.preventDefault();
      setGuessedLetters([]);
    };
    document.addEventListener("keypress", handleEnterPress);

    return () => {
      document.removeEventListener("keypress", handleEnterPress);
    };
  }, []);


  // Visuel
  return (
    <div className="content">

      <div className="titre">
        <h1>{isWinner && "Excellent ! Refresh si tu veux une autre partie !"}</h1>
        <h1>{isLoser && "Bien essayé. Refresh si tu veux une autre partie !"}</h1>
      </div>

      <div className="flex">
        <div>
          <HangmanDessin numberOfGuesses={incorrectLetters.length} />
        </div>

        <div className="width">
          <Keyboard disabled={isWinner || isLoser} activeLetters={guessedLetters.filter((letter) => wordToGuess.includes(letter))} inactiveLetters={incorrectLetters} addGuessedLetter={addGuessedLetter} />
        </div>
      </div>

      <HangmanMots reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess} />

    </div>
  );
}

export default App;
