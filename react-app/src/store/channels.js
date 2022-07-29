
const LOAD = '/channels/LOAD';
const ADD = '/channels/ADD';
const EDIT = '/channels/EDIT';
const REMOVE = '/channels/REMOVE';

const load = (list) => ({
  type: LOAD,
  list
})

const add = channel => ({
  type: ADD,
  channel
})

const edit = channel => ({
  type: EDIT,
  channel
})

const remove = channelId => ({
  type: REMOVE,
  channelId
})





export const loadChannels = (serverId) => async dispatch => {
  const res = await fetch(`/api/channels/${serverId}`);

  if (res.ok) {
    const list = await res.json();
    dispatch(load(list));
  }
}

export const createChannel = payload => async dispatch => {
  const res = await fetch(`/api/channels/${payload.server_id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const channel = await res.json();
    dispatch(add(channel));
    return channel;
  }
}

export const editChannel = payload => async dispatch => {
  const res = await fetch(`/api/channels/${payload.server_id}/${payload.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });


  if (res.ok) {
    const channel = await res.json();
    dispatch(edit(channel));
    return channel;
  }
}

export const deleteChannel = (serverId, channelId) => async dispatch => {
  const res = await fetch(`/api/channels/${serverId}/${channelId}`, {
    method: 'DELETE'
  })

  if (res.ok) {
    dispatch(remove(channelId))
  }
}

let newState;

export default function channelsReducer(state = {}, action) {
  switch (action.type) {
    case LOAD:
      newState = {};
      const channelsList = action.list['channels']
      // console.log("inside reducer", channelsList)
      channelsList.forEach(channel => {
        newState[channel.id] = channel
      })
      return newState;

    case ADD:
      newState = {...state};
      newState[action.channel.id] = action.channel;
      return newState;

    case EDIT:
      newState = {...state};
      newState[action.channel.id] = action.channel;
      return newState;

    case REMOVE:
      newState = {...state}
      delete newState[action.channelId];
      return newState;

    default:
      return state;
  }
}
