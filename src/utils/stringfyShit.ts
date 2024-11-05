import { TShift } from "../lib/generateShifts";

export default function stringfyShift(shift: TShift): { from: string, to: string, workable: boolean } {
    return {
        from: shift.from.format('HH:mm:ss DD-MM-YYYY'),
        to: shift.to.format('HH:mm:ss DD-MM-YYYY'),
        workable: shift.workable
    }
}