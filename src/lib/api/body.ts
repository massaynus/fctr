const body = {
  "operationName": "CreateAttendanceShift",
  "variables": {
    "date": "2024-11-01",
    "employeeId": 1483881,
    "clockIn": "2024-11-01T08:00:00.000Z",
    "clockOut": "2024-11-01T14:00:00.000Z",
    "referenceDate": "2024-11-01",
    "locationType": "work_from_home",
    "source": "desktop",
    "workable": true
  },
  "query": `
  mutation CreateAttendanceShift(
  $clockIn: ISO8601DateTime
  $clockOut: ISO8601DateTime
  $date: ISO8601Date!
  $employeeId: Int!
  $halfDay: String
  $locationType: AttendanceShiftLocationTypeEnum
  $observations: String
  $referenceDate: ISO8601Date!
  $source: AttendanceShiftSourceEnum
  $timeSettingsBreakConfigurationId: Int
  $workable: Boolean
) {
  attendanceMutations {
    createAttendanceShift(
      clockIn: $clockIn
      clockOut: $clockOut
      date: $date
      employeeId: $employeeId
      halfDay: $halfDay
      locationType: $locationType
      observations: $observations
      referenceDate: $referenceDate
      source: $source
      timeSettingsBreakConfigurationId: $timeSettingsBreakConfigurationId
      workable: $workable
    ) {
      errors {
        ...ErrorDetails
        __typename
      }
      shift {
        employee {
          id
          attendanceBalancesConnection(
            endOn: $referenceDate
            startOn: $referenceDate
          ) {
            nodes {
              ...TimesheetBalance
              __typename
            }
            __typename
          }
          attendanceWorkedTimesConnection(
            endOn: $referenceDate
            startOn: $referenceDate
          ) {
            nodes {
              ...TimesheetWorkedTime
              __typename
            }
            __typename
          }
          __typename
        }
        ...TimesheetPageShift
        __typename
      }
      __typename
    }
    __typename
  }
}
fragment TimesheetTimeSettingsBreakConfiguration on TimeSettingsBreakConfiguration {
  id
  __typename
}
fragment TimesheetPageWorkplace on LocationsLocation {
  id
  name
  __typename
}
fragment ErrorDetails on MutationError {
  ... on SimpleError {
    message
    type
    __typename
  }
  ... on StructuredError {
    field
    messages
    __typename
  }
  __typename
}
fragment TimesheetBalance on AttendanceBalance {
  id
  dailyBalance
  date
  __typename
}
fragment TimesheetWorkedTime on AttendanceWorkedTime {
  id
  date
  dayType
  effectiveMinutes
  minutes
  pendingMinutes
  trackedMinutes
  __typename
}
fragment TimesheetPageShift on AttendanceShift {
  id
  automaticClockIn
  automaticClockOut
  clockIn
  clockInWithSeconds
  clockOut
  crossesMidnight
  date
  employeeId
  halfDay
  isOvernight
  locationType
  minutes
  observations
  periodId
  referenceDate
  showPlusOneDay
  timeSettingsBreakConfiguration {
    ...TimesheetTimeSettingsBreakConfiguration
    __typename
  }
  workable
  workplace {
    ...TimesheetPageWorkplace
    __typename
  }
  __typename
}

  `
}

export default body