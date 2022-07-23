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
  // console.log("INSIDE LOADSERVERS THUNK")
  const res = await fetch(`/api/servers/`);
  // console.log("RES in THUNK", res)
  if (res.ok) {
    const list = await res.json();
    // console.log("INSIDE THUNK RES.OK", list)
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

export const editServer = payload => async dispatch => {
  const res = await fetch(`/api/servers/${payload.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const server = await res.json();
    dispatch(edit(server));
    return server;
  }
}

export const deleteServer = serverId => async dispatch => {
  const res = await fetch(`/api/servers/${serverId}`, {
    method: 'DELETE'
  })

  if (res.ok) {
    dispatch(remove(serverId))
  }
}

let newState;

export default function serversReducer(state = {}, action) {
  switch (action.type) {
    case LOAD:
      // console.log("REDUCER", action)
      newState = {};
      // console.log("action", action.list)
      const serversList = action.list['servers']
      // console.log("object.values", serversList)
      serversList.forEach(server => {
        newState[server.id] = server
      })
      return newState;

    case ADD:
      newState = {...state};
      newState[action.server.id] = action.server;
      return newState;

    case EDIT:
      newState = {...state};
      newState[action.server.id] = action.server;
      return newState;

    case REMOVE:
      newState = {...state}
      delete newState[action.serverId];
      return newState;

    default:
      return state;
  }
}
