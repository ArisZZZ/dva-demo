import { createLogger } from 'redux-logger';

export const dva = {
  config: {
    onAction: createLogger({
      predicate: (getState, action) => action.type === "todo/status",
    })
  }
}
