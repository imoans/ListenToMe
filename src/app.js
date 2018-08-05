// @flow

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  AppState,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import plainTalks from './domain/data/talks'
import TalkService from './domain/talk-service'
import actionCreators from './domain/redux/action-creators'
import Record from './domain/record'
import { createStateFromPlainState } from './domain/redux/state'

import {
  TextInputView,
  ChoicesView,
  Bear,
  Bubble,
  ConfirmView,
  FinishButton,
} from './parts'
import COLORS from './const/colors'
import { getStartOfDayISOString } from './util/date'
import Talk from './talk'
import Records from './records'
import { JumpToDailyRecordsButton } from './parts'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingTop: 40,
  },
})

type Props = {
  domainState: any,
  actions: any,
}

type State = {
  showDailyRecords: boolean
}

class AppComponent extends Component<Props, State> {
  constructor() {
    super()
    this.state = {
      showDailyRecords: false
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {!this.state.showDailyRecords &&
          <View>
            <JumpToDailyRecordsButton
              onPress={() => this.setState({ showDailyRecords: true })}
            />
            <Talk {...this.props} />
          </View>
        }
        {this.state.showDailyRecords &&
          <Records
            dailyRecords={this.props.domainState.dailyRecords}
            onClose={() => this.setState({ showDailyRecords: false })}
          />
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return { domainState: createStateFromPlainState(state) }
}

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent)
