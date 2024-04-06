type HangmanWordProps = {
  guessedLetters: string[];
  wordToGuess: string;
  reveal?: boolean;
};

export function HangmanMots({ guessedLetters, wordToGuess, reveal = false }: HangmanWordProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: ".25em",
        fontSize: "2rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "monospace",
      }}
    >
      {wordToGuess.split("").map((letter, index) => (
        <span key={index}>
          {guessedLetters.includes(letter) || reveal ? (
            <span style={{ color: guessedLetters.includes(letter) ? "black" : "#ad3535" }}>{letter}</span>
          ) : (
            "_"
          )}
        </span>
      ))}
    </div>
  );
}
