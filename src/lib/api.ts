import axios from "axios";
import { makeCreateShiftQuery } from "./makeCreateShiftQuery";

export async function createShift(clockIn: Date, clockOut: Date, date: Date) {

    // await axios.post('https://api.factorialhr.com/graphql', makeCreateShiftQuery(clockIn.toISOString(), clockOut.toISOString(), date.toDateString()))

}