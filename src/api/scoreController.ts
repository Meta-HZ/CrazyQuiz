export interface Score {
  name: string;
  score: number;
}

/**
 * method to get all scores from the database
 *
 * @returns the scores of the players
 */
export async function getScores(): Promise<Score[]> {
  // For now, consider the data is stored on a static `users.json` file
  const res = await fetch(
    "https://us-central1-crazyquiz-99d2d.cloudfunctions.net/getScores"
  );
  const res_1 = await res.json();
  return res_1.data as Score[];
}

/**
 * method to increment the score of the player
 *
 * @param name name of the player
 * @returns the response of the request
 */
export async function incrementScore(name: string): Promise<void> {
  const res = await fetch(
    `https://us-central1-crazyquiz-99d2d.cloudfunctions.net/incrementScore?name=${name}`
  );
  const res_1 = await res.json();
  return res_1 as void;
}

/**
 * method to decrement the score of the player
 *
 * @param name
 * @returns the response of the request
 */
export async function decrementScore(name: string): Promise<void> {
  const res = await fetch(
    `https://us-central1-crazyquiz-99d2d.cloudfunctions.net/decrementScore?name=${name}`
  );
  const res_1 = await res.json();
  return res_1 as void;
}

/**
 * method to add a new score to the database
 *
 * @param name the name of the player
 * @param score the score of the player
 * @returns the result of the operation
 */
export async function setScore(name: string, score: number): Promise<void> {
  const res = await fetch(
    `https://us-central1-crazyquiz-99d2d.cloudfunctions.net/addScore?name=${name}&score=${score}`
  );
  const res_1 = await res.json();
  return res_1 as void;
}
