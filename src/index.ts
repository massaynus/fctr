import 'dotenv/config'
import { generateDates, generateRandomNumber, generateShift } from "./lib/generateShifts";
import CreateCookies from "./lib/cookieLoader"
import { makeCreateShiftQuery } from "./lib/makeCreateShiftQuery";
import { post } from './lib/api/api';
import waitFor from './utils/waitFor';
import stringfyShift from './utils/stringfyShit';

const email = process.env.EMAIL
const password = process.env.PASSWORD

async function main() {
    if (typeof email === 'undefined' || typeof password === 'undefined') {
        console.log("Please setup EMAIL and PASSWORD env vars")
        return -1
    }

    console.log("Filling shifts for account:", { email })

    const dates = generateDates(11, 2024)
    const shifts = dates.map(generateShift).flatMap(s => s)

    console.log(`Generated ${shifts.length} shifts`)
    console.log('Generating sessions cookies')
    const cookies = await CreateCookies(email, password)

    console.log(`Got ${cookies.length} cookies for this session`)
    console.log(cookies.map(c => ({ name: c.name, value: c.value })))


    for (const shift of shifts) {
        const s = stringfyShift(shift)
        console.log("generating request for shift: ", s)
        const request = makeCreateShiftQuery(shift)

        console.log("sending request for shift: ", s)
        const response = await post('https://api.factorialhr.com/graphql', request, cookies)

        console.log("Got response for shift", response.status)
        // await waitFor(1 * 1000)
    }
}


main().then().catch(console.log)