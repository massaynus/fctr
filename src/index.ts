import 'dotenv/config'
import { generateDates, generateRandomNumber, generateShift } from "./lib/generateShifts";
import CreateCookies from "./lib/cookieLoader"
import { makeCreateShiftQuery } from "./lib/makeCreateShiftQuery";
import { post } from './lib/api';

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
        console.log("generating request for shift: ", shift)
        const request = makeCreateShiftQuery(shift)

        console.log("sending request for shift: ", shift)
        const response = await post('https://api.factorialhr.com/graphql', request, cookies)

        console.log("Got response for shift", response.status, shift, response)
    }


    return 0;
}


main().then(console.log).catch(console.log)