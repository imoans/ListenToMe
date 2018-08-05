// @flow

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import TalkService from './domain/talk-service'
import Emotion from './domain/emotion'
import actionCreators from './domain/redux/action-creators'

import {
  TextInputView,
  ChoicesView,
  ChoiceEmotionView,
  Bear,
  Bubble,
  ConfirmView,
  FinishButton,
} from './parts'
import COLORS from './const/colors'
import { getStartOfDayISOString } from './util/date'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingTop: 10,
  },
  bubbles: {
    paddingHorizontal: 20,
    height: 150,
    justifyContent: 'space-between',
    marginBottom: 30,
  },
})

type Props = {
  domainState: any,
  actions: any,
}

class Talk extends Component<Props> {
  componentWillMount() {
    const talkService = this.getTalkService().beginTalk()
    this.props.actions.updateTalkService(talkService)
  }

  getTalkService() {
    return this.props.domainState.talkService
  }

  goToNextTalk = () => {
    const talkService = this.getTalkService().goToNextTalk()
    this.props.actions.updateTalkService(talkService)
  }

  onPressBear = () => {
    if (this.isInQuestion() || this.getCurrentTalk().isLast()) return
    this.goToNextTalk()
  }

  onSubmitEmotion = (emotion: ?Emotion) => {
    if (emotion == null) return

    const talkService = this.getTalkService().goToNextTalkWithEmotion(emotion)
    this.props.actions.updateTalkService(talkService)
  }

  onSubmitText = (text: ?string) => {
    if (text == null || text === '') return

    const talkService = this.getTalkService().goToNextTalkWithText(text)
    this.props.actions.updateTalkService(talkService)
  }

  onCancel = () => {
    const talkService = this.getTalkService().cancelTalk()
    this.props.actions.updateTalkService(talkService)
  }

  onConfirm = () => {
    const record = this.props.domainState.talkService.record
    const dailyRecords = this.props.domainState.dailyRecords.setByDate(new Date(), record)
    this.props.actions.updateDailyRecords(dailyRecords)

    const talkService = this.getTalkService().goToNextTalk()
    this.props.actions.updateTalkService(talkService)
  }

  onFinish = () => {
    const talkService = this.getTalkService().finishTalk()
    this.props.actions.updateTalkService(talkService)
  }

  isInQuestion() {
    return this.getCurrentTalk() && this.getCurrentTalk().isQuestion()
  }

  onSelectingEmotion() {
    return this.getTalkService().onSelectingEmotion()
  }

  hasChoices() {
    return this.getCurrentTalk() && this.getCurrentTalk().hasChoices()
  }

  getCurrentTalk() {
    return this.getTalkService().currentTalk
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bubbles}>
          <Bubble
            backgroundColor={COLORS.base}
            text={this.getCurrentTalk() && this.getCurrentTalk().body}
          />
          {false &&
            <Bubble
              backgroundColor={COLORS.accent}
              text=""
            />
          }
        </View>
        <Bear onPress={this.onPressBear} />
        {this.isInQuestion() &&
          <TextInputView
            onSubmit={this.onSubmitText}
            onCancel={this.onCancel}
          />
        }
        {this.onSelectingEmotion() &&
          <ChoiceEmotionView
            emotions={TalkService.emotions}
            onSubmit={this.onSubmitEmotion}
            onCancel={this.onCancel}
          />
        }
        {this.hasChoices() && !this.getTalkService().isInConfirmToSave() &&
          <ChoicesView
            choices={this.getCurrentTalk().choices}
            onSubmit={this.goToNextTalk}
            onCancel={this.onCancel}
          />
        }
        {this.getTalkService().isInConfirmToSave() &&
          <ConfirmView
            record={this.getTalkService().record}
            onConfirm={this.onConfirm}
            onCancel={this.onCancel}
          />
        }
        {this.getCurrentTalk() && this.getCurrentTalk().isLast() &&
          <FinishButton
            onPress={this.onFinish}
          />
        }
      </View>
    )
  }
}

export default Talk
