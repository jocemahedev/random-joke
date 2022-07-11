import React, { useEffect, useState } from "react";
import "./App.css";
import Joke from "./components/Joke";
import ImageGif from "./components/ImageGif";
import Answer from "./components/Answer";
import Button from "./components/UI/Button";
import { Paper, Box } from "@mui/material";
import { getJoke } from "./components/service/index.js";
import Loading from "./components/UI/Loading";
import ErrorBlock from "./components/UI/ErrorBlock";
import useJoke from "./hooks/useJoke";

const SEE_RESPONSE = "Donne moi la réponse";
const JOKE_AGAIN = "Une autre !!!";
const LOADING_TEXT = "Loading";

function App() {
  const [currentJoke, setJoke] = useState({
    id: 0,
    joke: "",
    answer: "",
    type: "",
  });

  const [currentButtonText, setText] = useState(SEE_RESPONSE);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isHiddenAnswer, setIsHiddenAnswer] = useState(true);
  const onClickButton = () => {
    if (!error) {
      setIsHiddenAnswer(!isHiddenAnswer);
      isHiddenAnswer ? setText(JOKE_AGAIN) : getNewJoke();
    } else {
      setIsHiddenAnswer(true);
      setText("Try again");
    }
  };
  const getNewJoke = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await getJoke();
      if (response.error) {
        throw new Error(response.error);
      }
      setJoke(response);
      setText(SEE_RESPONSE);
      setIsLoading(false);
      return response;
    } catch (err) {
      setError('Erreur API: '+err.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getNewJoke();
  }, []);
  // const { joke,getNewJoke} = useJoke();
  // console.log(joke);

  return (
    <Paper
      sx={{
        p: 5,
        mx: "auto",
        minHeight: 430,
        minWidth: 275,
        maxWidth: 800,
        width: "auto",
      }}
      elevation={10}
    >
      <Box sx={{ p: 5, textAlign: "center", mx: "auto", width: "auto" }}>
        {error && <ErrorBlock text={error} />}
        {!isLoading && <Joke text={currentJoke.joke} />}
        {isLoading && <Loading text={LOADING_TEXT} />}
        {!isHiddenAnswer && <Answer text={currentJoke.answer} />}
        {!isHiddenAnswer && <ImageGif type={currentJoke.type} />}
      </Box>
      <Button onClickHandler={onClickButton} text={currentButtonText} />
    </Paper>
  );
}

export default App;
