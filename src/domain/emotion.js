// @flow

export type PlainEmotion = {
  type?: string,
  description?: string,
}

class Emotion {
  type: string
  description: string

  constructor(plainEmotion: PlainEmotion = {}) {
    const { type, description } = plainEmotion
    this.type = type || ''
    this.description = description || ''
  }
}

export default Emotion
