import React, { useState, useEffect } from 'react';
import './Quiz.css';


// function Quiz() {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [score, setScore] = useState(0);
//   const [showScore, setShowScore] = useState(false);
//   const [quizData, setQuizData] = useState([]);

//   useEffect(() => {
//     fetch('quizData.json')
//       .then(response => response.json())
//       .then(data => setQuizData(data))
//       .catch(error => console.error('Error loading quiz data:', error));
//   }, []);

//   const handleAnswer = (answer) => {
//     const nextQuestion = currentQuestion + 1;
//     if (nextQuestion < quizData.length) {
//       setCurrentQuestion(nextQuestion);
//     } else {
//       setShowScore(true);
//     }
//     if (answer === quizData[currentQuestion].correctAnswer) {
//       setScore(score + 1);
//     }
//   };

//   const handleRestart = () => {
//     setCurrentQuestion(0);
//     setScore(0);
//     setShowScore(false);
//   };

//   return (
//     <div className="quiz">
//       {showScore? (
//         <div className="score-section">
//           You scored {score} out of {quizData.length}
//           <button onClick={handleRestart}>Restart</button>
//         </div>
//       ) : (
//         <div className="question-section">
//           <div className="question-count">
//             <span>Question {currentQuestion + 1}</span>/{quizData.length}
//           </div>
//           <div className="question-text">
//             {quizData[currentQuestion].question}
//           </div>
//           <div className="answer-section">
//             {quizData[currentQuestion].answers.map((answer, index) => (
//               <button key={index} onClick={() => handleAnswer(answer)}>
//                 {answer}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [quizData, setQuizData] = useState([]);
    const [timeRemaining, setTimeRemaining] = useState(600);

    useEffect(() => {
        fetch('quizData.json')
        .then(response => response.json())
        .then(data => setQuizData(data))
        .catch(error => console.error('Error loading quiz data:', error));
    }, []);

    useEffect(() => {
        if (timeRemaining > 0 &&!showScore) {
          const timerId = setTimeout(() => {
            setTimeRemaining(timeRemaining - 1);
          }, 1000);
          return () => clearTimeout(timerId);
        }
      }, [timeRemaining, showScore]);
    
    const handleAnswer = (answer) => {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < quizData.length) {
            setCurrentQuestion(nextQuestion);
      } else {
          setShowScore(true);
        }
        if (answer === quizData[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }
    };
    
    const handleRestart = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setTimeRemaining(600); // Reset timer
    };
    
    return (
        <div className="quiz">
        {showScore? (
            <div className="score-section">
            You scored {score} out of {quizData.length}
            <button onClick={handleRestart}>Restart</button>
          </div>
        ) : (
            quizData.length > 0 && (
                <div className="question-section">
              <div className="question-count">
                <span>Question {currentQuestion + 1}</span>/{quizData.length}
              </div>
              <div className="question-text">
                {quizData[currentQuestion].question}
              </div>
              <div className="answer-section">
                {quizData[currentQuestion].answers.map((answer, index) => (
                    <button key={index} onClick={() => handleAnswer(answer)}>
                    {answer}
                  </button>
                ))}
              </div>
              <div className="timer">Time remaining: {formatTime(timeRemaining)}
            </div>
            </div>
          )
        )}
      </div>
    );
}
const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};
export default Quiz;