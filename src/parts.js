// @flow

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  TextInput,
} from 'react-native'
import COLORS from './const/colors'
import borderRadius from './const/border-radius'

import type Emotion from './domain/emotion'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  bubbles: {
    paddingHorizontal: 20,
    height: 150,
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  bubble: {
    backgroundColor: COLORS.base,
    paddingVertical: 12,
    paddingHorizontal: 13,
    borderRadius,
    width: width * 0.8,
    maxHeight: 100,
  },
  yourBubble: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.accent,
  },
  myBubble: {
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: 20,
  },
  textInBubble: {
    fontSize: 17,
    textAlign: 'center',
    color: COLORS.text,
  },
  bearImage: {
    width: 117 * 0.6,
    height: 308 * 0.6,
  },
  bear: {
    alignSelf: 'center',
  },
  inputView: {
    paddingHorizontal: 15,
    position: 'absolute',
    bottom: 0,
    backgroundColor: COLORS.tone,
    height: '50%',
    width: '100%',
    justifyContent: 'space-evenly',
    opacity: 0.85,
  },
  textInput: {
    borderRadius,
    width: '100%',
    height: '70%',
    padding: 10,
    fontSize: 17,
    backgroundColor: COLORS.base,
  },
  button: {
    borderRadius,
    alignItems: 'center',
    padding: 8,
  },
  submitButton: {
    backgroundColor: COLORS.accent,
  },
  buttonText: {
    color: COLORS.text,
  },
  jumpButton: {
    width,
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  confirmView: {
    justifyContent: 'space-evenly',
    borderRadius,
    width: '100%',
    height: '70%',
    padding: 10,
    backgroundColor: COLORS.base,
  },
  recordText: {
    marginLeft: 10,
  },
})

export const Bubble = ({
  backgroundColor,
  text
}: {
  backgroundColor: ?string,
  text: string,
}) => {
  return (
    <View style={[styles.bubble, { backgroundColor: backgroundColor || COLORS.base }]}>
      <Text style={styles.textInBubble}>{text}</Text>
    </View>
  )
}

export const Bubbles = () => {
  return (
    <View/>
  )
}

export const Bear = ({
  onPress
}: {
  onPress: () => void
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.bear}>
        <Image source={require('./images/bear-sitting.png')} />
      </View>
    </TouchableWithoutFeedback>
  )
}

export const Button = ({
  onPress,
  backgroundColor,
  text,
}: {
  onPress: (params: any) => void,
  backgroundColor: ?string,
  text: string,
}) => {
  return (
    <TouchableOpacity key={text} onPress={onPress}>
      <View style={[styles.button, { backgroundColor }]}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}

const CancelButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <Button
      text='やっぱりやめる'
      onPress={onPress}
      backgroundColor={COLORS.primary}
    />
  )
}

type Props = {
  onSubmit: (text: string) => void,
  onCancel: () => void,
}

type State = {
  inputText: string,
}

export class TextInputView extends Component<Props, State> {
  constructor() {
    super()
    this.state = {
      inputText: '',
    }
  }

  onChangeText = (text: string) => {
    this.setState({
      inputText: text,
    })
  }

  render() {
    return (
      <View style={styles.inputView}>
        <TextInput
          autoFocus
          multiline
          autoCorrect={false}
          autoCapitalize='none'
          onChangeText={this.onChangeText}
          style={styles.textInput}
        />
        <Button
          text='返信する'
          onPress={() => this.props.onSubmit(this.state.inputText)}
          backgroundColor={COLORS.accent}
        />
        <CancelButton onPress={this.props.onCancel} />
      </View>
    )
  }
}

export const ChoicesView = ({
  choices,
  onSubmit,
  onCancel,
}: {
  choices: Array<string>,
  onSubmit: (choice: string) => void,
  onCancel: () => void,
}) => {
  return (
    <View style={styles.inputView}>
      {choices.map((choice, index) => (
        <View key={`choices${index.toString()}`}>
          <Button
            text={choice}
            onPress={() => onSubmit(choice)}
            backgroundColor={COLORS.accent}
          />
        </View>
      ))}
      <CancelButton onPress={onCancel} />
    </View>
  )
}

export const ChoiceEmotionView = ({
  emotions,
  onSubmit,
  onCancel,
}: {
  emotions: Array<Emotion>,
  onSubmit: (emotion: ?Emotion) => void,
  onCancel: () => void,
}) => {
  return (
    <ChoicesView
      choices={emotions.map(emotion => emotion.description)}
      onSubmit={(choice) => onSubmit(emotions.find(emotion => emotion.description === choice))}
      onCancel={onCancel}
    />
  )
}

export const ConfirmView = ({
  record,
  onConfirm,
  onCancel,
}: {
  record: Record,
  onConfirm: () => void,
  onCancel: () => void,
}) => {
  return (
    <View style={styles.inputView}>
      <Record record={record} />
      <Button
        onPress={onConfirm}
        backgroundColor={COLORS.accent}
        text='保存する'
      />
      <CancelButton onPress={onCancel} />
    </View>
  )
}

const Record = ({ record }) => {
  return (
    <View style={styles.confirmView}>
      <Text style={styles.buttonText}>今日あったこと</Text>
      <Text style={[styles.buttonText, styles.recordText]}>{record.event}</Text>
      <Text style={styles.buttonText}>その出来事があったときの感情</Text>
      <Text style={[styles.buttonText, styles.recordText]}>{record.emotion.description}</Text>
      <Text style={styles.buttonText}>その出来事を受けて、自分にかけてあげたい言葉</Text>
      <Text style={[styles.buttonText, styles.recordText]}>{record.wordsToMyself}</Text>
    </View>
  )
}

export const JumpToDailyRecordsButton = ({
  onPress
}: {
  onPress: () => void,
}) => {
  return (
    <View style={styles.jumpButton}>
      <Button
        text='今までの記録を見る'
        onPress={onPress}
        backgroundColor={null}
      />
    </View>
  )
}

export const FinishButton = ({
  onPress
}: {
  onPress: () => void,
}) => {
  return (
    <Button
      text='終わりにする'
      onPress={onPress}
      backgroundColor={null}
    />
  )
}
