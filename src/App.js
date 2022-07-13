import React, { useEffect, useState } from "react";
import "./App.css";
import Joke from "./components/Joke";
import ImageGif from "./components/ImageGif";
import Answer from "./components/Answer";
import Button from "./components/UI/Button";
import CustomizedSwitches from "./components/UI/Switch";
import { Card, CardHeader, Box, CardContent } from "@mui/material";
import Loading from "./components/UI/Loading";
import ErrorBlock from "./components/UI/ErrorBlock";
import useJoke from "./hooks/useJoke";

const SEE_RESPONSE = "Fais moi rire";
const JOKE_AGAIN = "Une autre !!!";
const LOADING_TEXT = "";
const ERROR_TEXT = "Try Again";
const CHILDREN_ONLY = "👶 only";

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
    <Card
      sx={{
        p: 0,
        paddingBottom: 5,
        mx: "auto",
        maxWidth: 800,
      }}
      elevation={10}
    >
      <CardHeader
        title="🤣 Blagues a JOJO 🤣"
        sx={{
          backgroundColor: "#002964",
          color: "#fff",
          fontWeight: "bold",
          textAlign: "center",
        }}
      />
      <CardContent>
        <CustomizedSwitches
          checked={childrenRestriction}
          onChangeHandler={handlerChildrenRestriction}
          text={CHILDREN_ONLY}
        ></CustomizedSwitches>
        <Box sx={{ p: 5, textAlign: "center", mx: "auto", width: "auto" }}>
          {error && <ErrorBlock text={error} />}
          {!isLoading && <Joke text={jokeResponse.joke} />}
          {isLoading && <Loading text={LOADING_TEXT} />}
          {!isHiddenAnswer && <Answer text={jokeResponse.answer} />}
          {!isHiddenAnswer && <ImageGif type={jokeResponse.type} />}
        </Box>
        <Button onClickHandler={onClickButton} text={currentButtonText} />
      </CardContent>
    </Card>
  );
}

export default App;
