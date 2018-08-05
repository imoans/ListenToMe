// @flow

const middleware = (store: any) => (next: any) => (action: any) => {
  next(action)
}

export default middleware
