// @flow
import DailyRecords from '../daily-records'
import TalkService from '../talk-service'

const actionCreators = {
  updateDailyRecords(dailyRecords: DailyRecords) {
    return { type: 'updateDailyRecords', payload: { dailyRecords } }
  },
  updateTalkService(talkService: TalkService) {
    return { type: 'updateTalkService', payload: { talkService } }
  },
}

export default actionCreators
