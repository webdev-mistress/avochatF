import _ from 'lodash';

export const selectUserId = (state) => _.get(state, ('user.userId'));
