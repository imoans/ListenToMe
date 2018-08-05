// @flow

import Emotion from './emotion'
import type { PlainEmotion } from './emotion'

export type PlainRecord = {
  event?: string,
  emotion?: PlainEmotion | Emotion,
  wordsToMyself?: string,
}

class Record {
  event: string
  emotion: Emotion
  wordsToMyself: string

  constructor(plainRecord: PlainRecord = {}) {
    const { event, emotion, wordsToMyself } = plainRecord
    this.event = event || ''
    this.emotion = this.initializeEmotion(emotion)
    this.wordsToMyself = wordsToMyself || ''
  }

  initializeEmotion(emotion: ?(PlainEmotion | Emotion)) {
    if (emotion == null) return new Emotion()
    if (emotion instanceof Emotion) return emotion
    return new Emotion(emotion)
  }

  isFilled(): boolean {
    return this.event.length > 0
  }

  set(params: PlainRecord): Record {
    if (params == null) return this
    const { event, emotion, wordsToMyself } = params
    return new Record({
      ...this,
      ...params,
    })
  }
}

export default Record
