// @flow

import React, { Component } from 'react'
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native'

import type Record from './domain/record'
import type DailyRecords from './domain/daily-records'

import { getMDFormat } from './util/date'

import COLORS from './const/colors'
import borderRadius from './const/border-radius'

const { width, height } = Dimensions.get('window')
const containerPaddingHorizontal = 10

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: containerPaddingHorizontal,
    backgroundColor: COLORS.primary,
  },
  separator: {
    backgroundColor: COLORS.primary,
    height: 4,
  },
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    width: width - containerPaddingHorizontal * 2,
    backgroundColor: COLORS.base,
    paddingHorizontal: 20,
    borderRadius,
  },
  rowText: {
    color: COLORS.text,
    fontSize: 15,
  },
  closedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: 19,
    alignSelf: 'flex-start',
  },
  emotionText: {
    width: width * 0.6,
    alignItems: 'flex-start',
  },
  pullDownText: {
    fontSize: 16,
    color: COLORS.primary,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  closeButtonView: {
    width,
    paddingHorizontal: 10,
    alignItems: 'flex-end',
  },
  closeButtonText: {
    color: COLORS.base,
    fontSize: 35,
  },
})

type RecordData = Array<{ [key: string]: Array<Record> }>

const getData = (dailyRecords: DailyRecords): RecordData => {
  return dailyRecords.getKeys().map(key => {
    return { [key]: dailyRecords.getByKey(key) }
  })
}

const Records = ({
  dailyRecords,
  onClose,
}: {
  dailyRecords: DailyRecords,
  onClose: () => void,
}) => {
  return (
    <View style={styles.container}>
      <CloseButton onPress={onClose} />
      <FlatList
        data={getData(dailyRecords)}
        initialNumToRender={10}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => <EmptyRow />}
        renderItem={({ item }) => {
          return (
            <View>
            {Object.keys(item).map(key => (
              <View key={key}>
                <Row date={new Date(key)} records={item[key]} />
              </View>
            ))}
            </View>
          )
        }}
        keyExtractor={(item, index) => `list${index.toString()}`}
      />
    </View>
  )
}

const OpenedRow = ({ records }) => {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowText, styles.pullDownText]}>▲</Text>
      {records.map((record, index) => (
        <View key={`openedRow${index.toString()}`} style={styles.row}>
          <Text style={styles.rowText}>{record.event}</Text>
          <Text style={styles.rowText}>{record.emotion.description}</Text>
          <Text style={styles.rowText}>{record.wordsToMyself}</Text>
        </View>
      ))}
    </View>
  )
}

const EmptyRow = () => {
  return (
    <Text style={styles.rowText}>まだ記録がありません</Text>
  )
}

const ClosedRow = ({
  date,
  records,
}: {
  date: string,
  records: Array<Record>,
}) => {
  return (
    <View style={[styles.row, styles.closedRow]}>
      <Text style={[styles.dateText]}>{date}</Text>
      <Text style={[styles.emotionText]}>
        {records.map(record => record.emotion.description).join(', ')}
      </Text>
      <Text style={[styles.rowText, styles.pullDownText]}>▼</Text>
    </View>
  )
}

const CloseButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.closeButtonView}>
        <Text style={styles.closeButtonText}>✕</Text>
      </View>
    </TouchableOpacity>
  )
}

type RowState = {
  opened: boolean,
}

type RowProps = {
  records: Array<Record>,
  date: Date,
}

class Row extends Component<RowProps, RowState> {
  constructor() {
    super()
    this.state = {
      opened: false,
    }
  }

  onPress = () => {
    this.setState({
      opened: !this.state.opened
    })
  }

  render() {
    const { records, date } = this.props
    return (
      <TouchableOpacity onPress={this.onPress}>
        {!this.state.opened && <ClosedRow date={getMDFormat(date)} records={records} />}
        {this.state.opened && <OpenedRow records={records} />}
      </TouchableOpacity>
    )
  }
}

export default Records
