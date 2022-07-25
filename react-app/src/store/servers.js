const LOAD = '/servers/LOAD';
const LOAD_SINGLE_USER = '/servers/LOAD_SINGLE_USER';
const ADD = '/servers/ADD';
const EDIT = '/servers/EDIT';
const REMOVE = '/servers/REMOVE';
const CLEAR = '/servers/CLEAR';
// const JOIN = '/servers/JOIN';

const load = list => ({
  type: LOAD,
  list
})

const loadSingleUser = list => ({
  type: LOAD_SINGLE_USER,
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

const clear = () => ({
  type: CLEAR,

})

// const join = list => ({
//   type: JOIN,
//   list
// })

export const loadServers = () => async (dispatch) => {
  // console.log("INSIDE LOADSERVERS THUNK")
  const res = await fetch('/api/servers/');
  // console.log("RES in THUNK", res)
  if (res.ok) {
    const list = await res.json();
    // console.log("INSIDE THUNK RES.OK", list)
    dispatch(load(list));
  }
}

export const loadSingleUserServers = (userId) => async dispatch => {
  const res = await fetch(`/api/users/${userId}/servers`);

  console.log('res in loadSingleUserServers thunk: ', res);

  if (res.ok) {
    const list = await res.json();
    console.log('list in loadSingleUserServers thunk: ', list)
    dispatch(loadSingleUser(list));
  }
}

export const createServer = payload => async dispatch => {
  console.log("INSIDE createSERVERS THUNK")
  const res = await fetch(`/api/servers/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  console.log("RES in THUNK", res)

  if (res.ok) {
    const server = await res.json();
    console.log("INSIDE THUNK RES.OK", server)
    dispatch(add(server));
    return server;
  }
}

export const joinServer = payload => async dispatch => {
  console.log('payload in joinserver thunk: ', payload)
  const res = await fetch(`/api/servers/${payload.server_id}/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  console.log('res in joinServer thunk: ', res)

  if (res.ok) {
    const list = await res.json();
    console.log('res.ok, list: ', list)
    dispatch(loadSingleUser(list));
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
      newState = {...state};
      // console.log("action", action.list)
      const serversList = action.list['servers']
      // console.log("object.values", serversList)
      serversList.forEach(server => {
        newState[server.id] = server
      })
      return newState;

    case LOAD_SINGLE_USER:
      newState = {...state};

      const userServers = action.list['servers'];
      // console.log('userServers in reducer: ', userServers);

      // instantiate 'user-servers' key in newState.servers so that userServers can be normalized
      newState['user-servers'] = {};
      userServers.forEach(server => {
        newState['user-servers'][server.id] = server;
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

    // case JOIN:
    //   newState = {...state};
    //   newState['user-servers'] = action.list;
    //   return newState;

    default:
      return state;
  }
}
