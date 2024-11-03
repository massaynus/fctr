import 'dotenv/config'
import { generateDates, generateRandomNumber, generateShift } from "./lib/generateShifts";
import CreateCookies from "./lib/cookieLoader"
import { makeCreateShiftQuery } from "./lib/makeCreateShiftQuery";

const email = process.env.EMAIL
const password = process.env.PASSWORD

async function main() {
    console.log("Filling shifts for account:", { email })

    const dates = generateDates(11, 2024)
    const shifts = dates.map(generateShift)
    const requests = shifts.flatMap((shift) => shift).map(makeCreateShiftQuery)

    // const cookies = await CreateCookies(email, password)

    return 0;
}


main().then(console.log).catch(console.log)