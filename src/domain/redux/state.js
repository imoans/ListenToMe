// @flow
import DailyRecords from '../daily-records'
import TalkService from '../talk-service'

export type State = {
  dailyRecords: DailyRecords,
  talkService: TalkService,
}

export type PlainState = {
  dailyRecords?: Object,
  talkService?: Object,
}

export const initialState: State = {
  dailyRecords: new DailyRecords(),
  talkService: new TalkService(),
}

export const createStateFromPlainState = (plainState: PlainState) => {
  const { dailyRecords, talkService } = plainState
  return {
    dailyRecords: new DailyRecords(dailyRecords),
    talkService: new TalkService(talkService),
  }
}

export const set = (state: State, params: PlainState) => {
  return {
    ...state,
    ...params,
  }
}
