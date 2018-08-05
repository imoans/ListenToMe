// @flow

import Talks from './talks'
import type { PlainTalks } from './talks'
import Talk from './talk'
import type { PlainTalk } from './talk'
import Record from './record'
import type { PlainRecord } from './record'
import Emotion from './emotion'

import plainEmotions from './data/emotions'
import plainTalks from './data/talks'

type PlainTalkService = {
  talks?: PlainTalks | Talks,
  record?: PlainRecord | Record,
  currentTalk?: PlainTalk | Talk,
}

class TalkService {
  talks: Talks
  record: Record
  currentTalk: Talk

  static get emotions(): Array<Emotion> {
    return plainEmotions.map(plainEmotion => new Emotion(plainEmotion))
  }

  constructor(plainTalkService: PlainTalkService = {}) {
    const { talks, record, currentTalk } = plainTalkService
    this.talks = talks instanceof Talks ? talks : new Talks(talks)
    this.currentTalk = currentTalk instanceof Talk ? currentTalk : new Talk(currentTalk)
    this.record = record instanceof Record ? record : new Record(record)
  }

  set(params: PlainTalkService): TalkService {
    if (params == null) return this
    const { talks, record, currentTalk } = params
    return new TalkService({
      ...this,
      ...params,
    })
  }

  cancelTalk(): TalkService {
    if (this.currentTalk.name !== 'confirmToSave' && this.record.isFilled()) {
      return this.set({ currentTalk: this.talks.getConfirmToSaveTalk() })
    }

    return this.set({ currentTalk: this.talks.getLast() })
  }

  beginTalk(): TalkService {
    const talks = new Talks({ talks: plainTalks })
    return this.set({
      talks,
      currentTalk: talks.getFirst(),
    })
  }

  onSelectingEmotion(): boolean {
    return this.currentTalk && this.currentTalk.recordType === 'emotion'
  }

  goToNextTalkWithText(text: string): TalkService {
    let record = this.record

    switch (this.currentTalk.recordType) {
      case 'event':
        record = record.set({ event: text })
        break
      case 'wordsToMyself':
        record = record.set({ wordsToMyself: text })
        break
      default:
        break
    }

    return this.set({
      record,
      currentTalk: this.talks.getNext(this.currentTalk),
    })
  }

  goToNextTalkWithEmotion(emotion: Emotion): TalkService {
    return this.set({
      record: this.record.set({ emotion }),
      currentTalk: this.talks.getNext(this.currentTalk),
    })
  }

  goToNextTalk(): TalkService {
    return this.set({ currentTalk: this.talks.getNext(this.currentTalk) })
  }

  isInConfirmToSave(): boolean {
    return this.currentTalk && this.currentTalk.name === 'confirmToSave'
  }

  finishTalk(): TalkService {
    return this.set({
      currentTalk: this.talks.getFirst(),
      record: new Record(),
    })
  }
}

export default TalkService
