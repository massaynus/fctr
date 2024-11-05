import request from './api/body'
import { TShift } from './generateShifts'


export function makeCreateShiftQuery(shift: TShift) {
    const clockIn = shift.from.toDate().toISOString()
    const clockOut = shift.to.toDate().toISOString()
    const date = shift.from.format("YYYY-MM-DD")

    const r = JSON.parse(JSON.stringify(request))
    r.variables.clockIn = clockIn
    r.variables.clockOut = clockOut
    r.variables.date = date
    r.variables.referenceDate = date
    r.variables.workable = shift.workable

    return r
}