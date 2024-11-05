import { ignoredDates } from "../config/ignoreDates";
import dayjs, { Dayjs } from "dayjs";

export type TShift = {
    from: Dayjs;
    to: Dayjs;
    workable: boolean;
};

export function generateDates(month: number, year: number): Dayjs[] {

    const monthD = dayjs().month(month + 1).year(year)
    const daysInMonth = monthD.daysInMonth()

    return new Array(daysInMonth)
        .fill(monthD)
        .map((_, idx) => dayjs().month(month - 1).year(year).date(idx + 1))
}

export function generateShift(date: Dayjs): TShift[] {
    if (date.day() === 0 || date.day() === 6) return []
    if (ignoredDates.has(date.format('YYYY-MM-DD'))) {
        console.log('Holiday detected!', date.toString())
        return []
    }

    let workHoursLeft = 8

    const fStartHourRaw = generateRandomNumber(7.6, 9)
    const fStartHour = Math.floor(fStartHourRaw)
    const fStartMinute = hourFractionToMinutes(fStartHourRaw)

    const fEndHourRaw = generateRandomNumber(12, 15)
    const fEndHour = Math.floor(fEndHourRaw)
    const fEndMinute = hourFractionToMinutes(fEndHourRaw)

    workHoursLeft -= fEndHourRaw - fStartHourRaw;

    const breakStartHourRaw = fEndHourRaw
    const breakStartHour = Math.floor(breakStartHourRaw)
    const breakStartMinute = hourFractionToMinutes(breakStartHourRaw)

    const breakEndHourRaw = fEndHourRaw + generateRandomNumber(0.8, 1.5)
    const breakEndHour = Math.floor(breakEndHourRaw)
    const breakEndMinute = hourFractionToMinutes(breakEndHourRaw)

    const sStartHourRaw = breakEndHourRaw;
    const sStartHour = Math.floor(sStartHourRaw)
    const sStartMinute = hourFractionToMinutes(sStartHourRaw)

    const sEndHourRaw = breakEndHourRaw + workHoursLeft
    const sEndHour = Math.floor(sEndHourRaw)
    const sEndMinute = hourFractionToMinutes(sEndHourRaw)

    workHoursLeft -= sEndHourRaw - breakEndHourRaw;


    if (Math.abs(workHoursLeft) > 0.00001) {
        console.log({
            workHoursLeft,

            fStartHourRaw,
            fEndHourRaw,

            breakStartHourRaw,
            breakEndHourRaw,

            sStartHourRaw,
            sEndHourRaw,
        })
        throw Error("Bug Detected!")
    }

    return [
        {
            from: date.clone().hour(fStartHour).minute(fStartMinute),
            to: date.clone().hour(fEndHour).minute(fEndMinute),
            workable: true
        },
        {
            from: date.clone().hour(breakStartHour).minute(breakStartMinute),
            to: date.clone().hour(breakEndHour).minute(breakEndMinute),
            workable: false
        },
        {
            from: date.clone().hour(sStartHour).minute(sStartMinute),
            to: date.clone().hour(sEndHour).minute(sEndMinute),
            workable: true
        },
    ]

}

export function hourFractionToMinutes(hour: number): number {
    return Math.round((hour - Math.floor(hour)) * 60)
}

export function generateRandomNumber(from: number, to: number): number {
    return Math.round(Math.max(from, Math.min(to, from + (Math.random() * to))) * 100) / 100
}