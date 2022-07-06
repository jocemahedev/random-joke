import React, { useEffect,useState } from "react";
import "./App.css";
import Joke from "./components/Joke";
import ImageGif from "./components/ImageGif";
import Answer from "./components/Answer";
import Button from "./components/UI/Button";
import { getJoke } from "./components/service/index.js";

const SEE_RESPONSE = "Donne moi la réponse";
const JOKE_AGAIN = "Une autre !!!";

function App() {
  const [currentJoke, setJoke] = useState({
    id: 0,
    joke: "",
    answer: "",
    type: "",
  });

  const getNewJoke = async () => {
    const newJoke = await getJoke();
    setJoke(newJoke);
    setText(SEE_RESPONSE);
  };
  const [currentButtonText, setText] = useState(SEE_RESPONSE);
  const [isHiddenAnswer, setIsHiddenAnswer] = useState(true);
  const getNew = () => {
    setIsHiddenAnswer(!isHiddenAnswer);
    isHiddenAnswer ? setText(JOKE_AGAIN) : getNewJoke();
  };
  useEffect(() => {getNewJoke()},[]);
  return (
    <div className="App">
      <Joke text={currentJoke.joke} />
      {!isHiddenAnswer && <Answer text={currentJoke.answer} />}
      {!isHiddenAnswer && <ImageGif type={currentJoke.type} />}
      <Button onClickHandler={getNew} text={currentButtonText} />
    </div>
  );
}

export default App;
