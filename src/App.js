import React, { useEffect, useState } from "react";
import "./App.css";
import Joke from "./components/Joke";
import ImageGif from "./components/ImageGif";
import Answer from "./components/Answer";
import Button from "./components/UI/Button";
import Switch from "./components/UI/Switch";
import { Paper, Box } from "@mui/material";
import Loading from "./components/UI/Loading";
import ErrorBlock from "./components/UI/ErrorBlock";
import useJoke from "./hooks/useJoke";

const SEE_RESPONSE = "Fais moi rire";
const JOKE_AGAIN = "Une autre !!!";
const LOADING_TEXT = "";
const ERROR_TEXT = "Try Again";
const CHILDREN_ONLY = "Blagounettes pour les enfants";

function App() {
  const [currentButtonText, setText] = useState(SEE_RESPONSE);
  const [isHiddenAnswer, setIsHiddenAnswer] = useState(true);
  const [childrenRestriction, setChildrenRestriction] = useState(false);
  const onClickButton = () => {
  console.log(jokeResponse);
    if (!error) {
      setIsHiddenAnswer(!isHiddenAnswer);
      if (isHiddenAnswer) {
        setText(JOKE_AGAIN);
      } else {
        getNewJoke(childrenRestriction);
        setText(SEE_RESPONSE);
      }
    } else {
      setIsHiddenAnswer(true);
      setText(ERROR_TEXT);
    }
  };
  const { error, isLoading, jokeResponse, getNewJoke } = useJoke();

  useEffect(() => {
    getNewJoke(childrenRestriction);
  }, [getNewJoke, childrenRestriction]);

  const handlerChildrenRestriction = () => {
    setChildrenRestriction(!childrenRestriction);

     getNewJoke(childrenRestriction);
     setIsHiddenAnswer(true);
     setText(SEE_RESPONSE);
  };
  return (
    <Paper
      sx={{
        p: 10,
        mx: "auto",
        minHeight: 430,
        minWidth: 275,
        maxWidth: 800,
        width: "100%",
      }}
      elevation={10}
    >
      <Switch
        checked={childrenRestriction}
        onChangeHandler={handlerChildrenRestriction}
        text={CHILDREN_ONLY}
      ></Switch>
      <Box sx={{ p: 5, textAlign: "center", mx: "auto", width: "auto" }}>
        {error && <ErrorBlock text={error} />}
        {!isLoading && <Joke text={jokeResponse.joke} />}
        {isLoading && <Loading text={LOADING_TEXT} />}
        {!isHiddenAnswer && <Answer text={jokeResponse.answer} />}
        {!isHiddenAnswer && <ImageGif type={jokeResponse.type} />}
      </Box>
      <Button onClickHandler={onClickButton} text={currentButtonText} />
    </Paper>
  );
}

export default App;
