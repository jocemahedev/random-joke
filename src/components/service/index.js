
const BlaguesAPI = require("blagues-api");

const blagues = new BlaguesAPI(process.env.REACT_APP_BLAGUE_API_KEY);

export async function getJoke() {
  const receivedJoke = await blagues.random();
  return receivedJoke;
}
