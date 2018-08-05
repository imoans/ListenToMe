// @flow

export type PlainTalk = {
  name?: string,
  body?: string,
  choices?: Array<string>,
  recordType?: 'none'| 'event' | 'emotion' | 'wordsToMyself',
  next?: string,
}

class Talk {
  name: string
  body: string
  choices: Array<string>
  recordType: 'none'| 'event' | 'emotion' | 'wordsToMyself'
  next: string

  constructor(plainTalk: PlainTalk = {}) {
    const { name, body, choices, recordType, next } = plainTalk
    this.name = name || ''
    this.body = body || ''
    this.choices = choices || []
    this.recordType = recordType || 'none'
    this.next = next || ''
  }

  isLast() {
    return this.next === ''
  }

  isQuestion() {
    return this.recordType === 'event' || this.recordType === 'wordsToMyself'
  }

  hasChoices() {
    return this.choices.length > 0
  }
}

export default Talk
