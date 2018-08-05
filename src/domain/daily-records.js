// @flow
import { getStartOfDayISOString } from '../util/date'
import Record from './record'
import type { PlainRecord } from './record'

type PlainDailyRecordsMap = { [date: string]: Array<PlainRecord | Record> }
type DailyRecordsMap = { [date: string]: Array<Record> }
type PlainDailyRecords = {
  dailyRecords?: PlainDailyRecordsMap,
}

class DailyRecords {
  dailyRecords: DailyRecordsMap

  static initializeDailyRecords(
    dailyRecords: ?PlainDailyRecordsMap
  ): DailyRecordsMap {
    if (dailyRecords == null || Object.keys(dailyRecords).length === 0) return {}
    const newDailyRecords = {}
    Object.entries(dailyRecords).forEach(([key, value]) => {
      // $FlowFixMe
      newDailyRecords[key] = value.map(record => {
        if (record instanceof Record) return record
        return new Record(record)
      })
    })
    return newDailyRecords
  }

  constructor(plainDailyRecords: PlainDailyRecords = {}) {
    const { dailyRecords } = plainDailyRecords
    this.dailyRecords = DailyRecords.initializeDailyRecords(dailyRecords)
  }

  getByKey(key: string): Array<Record> {
    return this.dailyRecords[key]
  }

  getKeys(): Array<string> {
    return Object.keys(this.dailyRecords)
  }

  getByDate(date: Date): Array<Record> {
    return this.dailyRecords[getStartOfDayISOString(date)] || []
  }

  setByDate(date: Date, record: Record): DailyRecords {
    const records = this.getByDate(date)
    const dailyRecords = Object.assign({}, this.dailyRecords)
    dailyRecords[getStartOfDayISOString(date)] = records.concat(record)

    return new DailyRecords({ dailyRecords })
  }

  set(params: { dailyRecords: DailyRecordsMap }) {
    if (params == null) return this
    // $FlowFixMe
    return new DailyRecords({
      ...this,
      ...params,
    })
  }
}

export default DailyRecords
