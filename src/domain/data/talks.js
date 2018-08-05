// @flow

const plainTalks = [
  {
    name: 'greeting',
    body: 'ようこそ、\nお話するにはぼくをタップしてね。',
    next: 'event',
  },
  {
    name: 'event',
    body: '今日はどんなことがあった?',
    recordType: 'event',
    next: 'agree1',
  },
  {
    name: 'agree1',
    body: 'そうか、そんなことがあったんだね',
    next: 'emotion',
  },
  {
    name: 'emotion',
    body: 'もしよければ、どんな気持ちだったか教えて',
    recordType: 'emotion',
    next: 'agree2',
  },
  {
    name: 'agree2',
    body: 'そうか、そんな気持ちだったんだね',
    next: 'continue',
  },
  {
    name: 'continue',
    body: 'まだお話し続けてくれる?',
    choices: ['はい'],
    next: 'wordsToMyself',
  },
  {
    name: 'wordsToMyself',
    body: '自分にどんな言葉をかけてあげたい?',
    recordType: 'wordsToMyself',
    next: 'agree3',
  },
  {
    name: 'agree3',
    body: 'うんうん、とってもいいと思う！',
    next: 'confirmToSave',
  },
  {
    name: 'confirmToSave',
    body: 'お話してくれた内容だよ。\n取っておく?',
    choices: ['はい'],
    next: 'final',
  },
  {
    name: 'final',
    body: 'お話してくれてありがとう、\nまた今度ね！',
  },
]

export default plainTalks
