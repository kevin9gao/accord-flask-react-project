import { csrfFetch } from './csrf';

const LOAD = '/servers/LOAD';
const ADD = '/servers/ADD';
const EDIT = '/servers/EDIT';
const REMOVE = '/servers/REMOVE';

const load = list => ({
  type: LOAD,
  list
})

const add = server => ({
  type: ADD,
  server
})

const edit = server => ({
  type: EDIT,
  server
})

const remove = serverId => ({
  type: REMOVE,
  serverId
})

export const loadServers = () => async dispatch => {
  const res = await fetch(`/api/servers`);

  if (res.ok) {
    const list = await res.json();
    dispatch(load(list));
  }
}

export const createServer = payload => async dispatch => {
  const res = await fetch(`/api/servers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const server = await res.json();
    dispatch(add(server));
    return server;
  }
}

let newState;

export default function serversReducer(state = {}, action) {
  switch (action.type) {
    case LOAD:
      newState = {};
      action.list.forEach(server => {
        newState[server.id] = server
      })
      return newState;
    case ADD:
      newState = {...state};
      newState[action.server.id] = action.server;
      return newState;
    default:
      return state;
  }
}
