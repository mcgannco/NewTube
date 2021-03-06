import * as ApiUtil from '../util/subscription_api_util';

export const RECEIVE_SUBS = "RECEIVE_SUBS";
export const RECEIVE_SUB = "RECEIVE_SUB";
export const REMOVE_SUB = "REMOVE_SUB";

const receiveSubs = (subs) => ({
  type: RECEIVE_SUBS,
  subs,
});

const receiveSub = (sub) => ({
  type: RECEIVE_SUB,
  sub: sub.sub,
  subCount: sub.subCount,
});

const removeSub = (sub) => ({
  type: REMOVE_SUB,
  sub: sub.sub,
  subCount: sub.subCount,
});

export const createSub = (sub) => dispatch => {
  return ApiUtil.createSub(sub).then(sub => dispatch(receiveSub(sub)));
};

export const fetchSubs = () => dispatch => {
  return ApiUtil.fetchSubs().then(subs => dispatch(receiveSubs(subs)));
};

export const deleteSub = (subId) => dispatch => {
  return ApiUtil.deleteSub(subId).then(
    sub => dispatch(removeSub(sub))
  );
};
