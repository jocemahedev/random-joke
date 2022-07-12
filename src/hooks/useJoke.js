import { useState, useCallback } from "react";

const BlaguesAPI = require("blagues-api");
const blagues = new BlaguesAPI(process.env.REACT_APP_BLAGUE_API_KEY);

const useJoke = () => {
  const [jokeResponse, setJokeResponse] = useState({
    id: 0,
    joke: "",
    answer: "",
    type: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getNewJoke = useCallback(async (childrenRestriction) => {
    try {
      setError(null);
      setIsLoading(true);
      let restriction = "";
      if (childrenRestriction) {
        restriction = {
          disallow: [
            blagues.categories.DARK,
            blagues.categories.LIMIT,
            blagues.categories.BLONDES,
            blagues.categories.BEAUF,
          ],
        };
      }
      const response = await blagues.random(restriction);
      if (response.error) {
        throw new Error("Request failed!");
      }
      setJokeResponse(response);
    } catch (err) {
      setJokeResponse({
        id: 0,
        joke: "",
        answer: "",
        type: "",
      });
      setError("Erreur API: " + err.message);
      setIsLoading(false);

    }
    setError(null);
    setIsLoading(false);
  },[]);
  return { error, isLoading, jokeResponse, getNewJoke };
};

export default useJoke;
