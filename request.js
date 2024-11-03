fetch("https://api.factorialhr.com/graphql", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Chromium\";v=\"130\", \"Microsoft Edge\";v=\"130\", \"Not?A_Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "x-deployment-phase": "default"
  },
  "referrer": "https://app.factorialhr.com/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "{\"operationName\":\"CreateAttendanceShift\",\"variables\":{\"date\":\"2024-11-01\",\"employeeId\":1483881,\"clockIn\":\"2024-11-01T08:00:00.000Z\",\"clockOut\":\"2024-11-01T14:00:00.000Z\",\"referenceDate\":\"2024-11-01\",\"locationType\":\"work_from_home\",\"source\":\"desktop\",\"workable\":true},\"query\":\"mutation CreateAttendanceShift($clockIn: ISO8601DateTime, $clockOut: ISO8601DateTime, $date: ISO8601Date!, $employeeId: Int!, $halfDay: String, $locationType: AttendanceShiftLocationTypeEnum, $observations: String, $referenceDate: ISO8601Date!, $source: AttendanceShiftSourceEnum, $timeSettingsBreakConfigurationId: Int, $workable: Boolean) {\\n  attendanceMutations {\\n    createAttendanceShift(\\n      clockIn: $clockIn\\n      clockOut: $clockOut\\n      date: $date\\n      employeeId: $employeeId\\n      halfDay: $halfDay\\n      locationType: $locationType\\n      observations: $observations\\n      referenceDate: $referenceDate\\n      source: $source\\n      timeSettingsBreakConfigurationId: $timeSettingsBreakConfigurationId\\n      workable: $workable\\n    ) {\\n      errors {\\n        ...ErrorDetails\\n        __typename\\n      }\\n      shift {\\n        employee {\\n          id\\n          attendanceBalancesConnection(endOn: $referenceDate, startOn: $referenceDate) {\\n            nodes {\\n              ...TimesheetBalance\\n              __typename\\n            }\\n            __typename\\n          }\\n          attendanceWorkedTimesConnection(endOn: $referenceDate, startOn: $referenceDate) {\\n            nodes {\\n              ...TimesheetWorkedTime\\n              __typename\\n            }\\n            __typename\\n          }\\n          __typename\\n        }\\n        ...TimesheetPageShift\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\\nfragment TimesheetTimeSettingsBreakConfiguration on TimeSettingsBreakConfiguration {\\n  id\\n  __typename\\n}\\n\\nfragment TimesheetPageWorkplace on LocationsLocation {\\n  id\\n  name\\n  __typename\\n}\\n\\nfragment ErrorDetails on MutationError {\\n  ... on SimpleError {\\n    message\\n    type\\n    __typename\\n  }\\n  ... on StructuredError {\\n    field\\n    messages\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment TimesheetBalance on AttendanceBalance {\\n  id\\n  dailyBalance\\n  date\\n  __typename\\n}\\n\\nfragment TimesheetWorkedTime on AttendanceWorkedTime {\\n  id\\n  date\\n  dayType\\n  effectiveMinutes\\n  minutes\\n  pendingMinutes\\n  trackedMinutes\\n  __typename\\n}\\n\\nfragment TimesheetPageShift on AttendanceShift {\\n  id\\n  automaticClockIn\\n  automaticClockOut\\n  clockIn\\n  clockInWithSeconds\\n  clockOut\\n  crossesMidnight\\n  date\\n  employeeId\\n  halfDay\\n  isOvernight\\n  locationType\\n  minutes\\n  observations\\n  periodId\\n  referenceDate\\n  showPlusOneDay\\n  timeSettingsBreakConfiguration {\\n    ...TimesheetTimeSettingsBreakConfiguration\\n    __typename\\n  }\\n  workable\\n  workplace {\\n    ...TimesheetPageWorkplace\\n    __typename\\n  }\\n  __typename\\n}\"}",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});
