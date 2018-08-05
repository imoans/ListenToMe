// @flow
import Talk from './talk'
import type { PlainTalk } from './talk'

export type PlainTalks = {
  talks?: Array<PlainTalk | Talk>
}

class Talks {
  talks: Array<Talk>

  static initializeTalks(talks: ?Talks | ?Array<PlainTalk | Talk>) {
    if (talks == null) return []
    if (talks instanceof Talks) return talks.talks
    if (talks.length === 0) return []
    return talks.map(talk => {
      if (!(talk instanceof Talk)) return new Talk(talk)
      return talk
    })
  }

  constructor(plainTalks: PlainTalks = {}) {
    const { talks } = plainTalks
    this.talks = Talks.initializeTalks(talks)
  }

  getFirst() {
    return this.talks[0]
  }

  getNext(currentTalk: Talk) {
    if (currentTalk.isLast()) return null
    return this.talks.find(talk => talk.name === currentTalk.next)
  }

  getConfirmToSaveTalk() {
    return this.talks.find(t => t.name === 'confirmToSave')
  }

  getLast() {
    return this.talks.find(t => t.isLast())
  }
}

export default Talks
