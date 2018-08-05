// @flow
import DailyRecords from '../daily-records'
import TalkService from '../talk-service'
import type { State } from './state'
import { initialState, set } from './state'

const reducer = (state: State = initialState, action: any) => {
  const { type, payload } = action
  switch (type) {
    case 'updateDailyRecords':
      const { dailyRecords } = payload
      return set(state, { dailyRecords })
    case 'updateTalkService':
      const { talkService } = payload
      return set(state, { talkService })
    default:
      return state
  }
}

export default reducer
