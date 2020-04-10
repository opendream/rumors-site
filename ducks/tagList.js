import { createDuck } from 'redux-duck';
import { fromJS, List } from 'immutable';
import gql from '../util/gql';
import { commonSetState } from '../util/reducer';

const { defineType, createReducer, createAction } = createDuck('tagList');

// Action Types
//

const LOAD = defineType('LOAD');
const SET_STATE = defineType('SET_STATE');

// Action creators
//
export const setState = createAction(SET_STATE);

export const load = ({
  orderBy = 'createdAt_DESC',
  before,
  after,
}) => dispatch => {

  // If there is query text, sort by _score first

  const [orderByField, orderByDirection] = orderBy.split('_');

  const orderByArray = [{ [orderByField]: orderByDirection }];

  dispatch(setState({ key: 'isLoading', value: true }));
  return gql`query(
    $orderBy: [ListTagOrderBy],
    $before: String,
    $after: String,
  ) {
    ListTags(
      orderBy: $orderBy
      before: $before
      after: $after
      first: 25
    ) {
      edges {
        node {
          title
          priority
          createdAt
        }
        cursor
      }

      pageInfo {
        firstCursor
        lastCursor
      }
      totalCount

    }
  }`({
    orderBy: orderByArray,
    before,
    after,
  }).then(resp => {
    // only ignore costy fields on browser.
    //
    dispatch(createAction(LOAD)(resp.getIn(['data', 'ListTags'], List())));
    dispatch(setState({ key: 'isLoading', value: false }));
  });
};

// Reducer
//

const initialState = fromJS({
  state: { isLoading: true },
  edges: null,
  firstCursor: null,
  lastCursor: null,
  totalCount: null,
});

export default createReducer(
  {
    [SET_STATE]: commonSetState,
    [LOAD]: (state, { payload }) =>
      state
        .set(
          'edges',
          (payload.get('edges') || List()).map(edge =>
            edge.setIn(
              ['node', 'tagConnectionCount'],
              (edge.getIn(['node', 'tagConnections']) || List()).size
            )
          )
        )
        .set(
          'firstCursor',
          payload.getIn(['pageInfo', 'firstCursor']) || state.get('firstCursor')
        )
        .set(
          'lastCursor',
          payload.getIn(['pageInfo', 'lastCursor']) || state.get('lastCursor')
        )
        .set(
          'totalCount',
          payload.get('totalCount') || state.get('totalCount')
        ),
  },
  initialState
);
