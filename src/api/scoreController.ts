export interface Score {
    name: string
    score: number
}


export async function getScores(): Promise<Score[]> { 
    // For now, consider the data is stored on a static `users.json` file
    const res = await fetch('https://us-central1-crazyquiz-99d2d.cloudfunctions.net/getScores')
    const res_1 = await res.json()
    return res_1.data as Score[]
}

 export async function setScore (name: string, score: number): Promise<void> {
    const res = await fetch(`https://us-central1-crazyquiz-99d2d.cloudfunctions.net/addScore?name=${name}&score=${score}`)
    const res_1 = await res.json()
    return res_1 as void
}
