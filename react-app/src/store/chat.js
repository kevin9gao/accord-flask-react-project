const LOAD = '/chat/LOAD';
const SEND = '/chat/SEND';

const load = list => ({
  type: LOAD,
  list
})

const send = message => ({
  type: SEND,
  message
})

export const loadLiveChatHistory = (channelId) => async dispatch => {
  const res = await fetch(`/api/chat/live_chat/${channelId}`);

  if (res.ok) {
    const list = await res.json();
    dispatch(load(list));
  }
}

export const sendLiveChatMessage = payload => async dispatch => {

  // add type key to payload object so that the reducer can discern if live chat or dm
  payload['type'] = 'live-chat';

  console.log('hitting sendLiveChatMessage thunk');

  const res = await fetch(`/api/chat/live_chat/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  console.log('sendLiveChatMessage thunk res: ', res);

  if (res.ok) {
    const message = await res.json();
    console.log('sendLiveChatMessage res.ok, message: ', message);
    dispatch(send(message));
    console.log('after sendLiveChatMessage dispatch');
    return message;
  }
}

let newState;


export default function chatReducer(state = {}, action) {
  switch (action.type) {
    case LOAD:
      newState = {...state};

      // store chat history in live_chat_history or dm_history based on which key is in action
      if (action.list['live_chat_history']) {
        const chatHistory = action.list['live_chat_history'];
        chatHistory.forEach(message => {
          newState['live-chat-history'][message.id] = message;
        })
      } else {
        const chatHistory = action.list['dm_history'];
        chatHistory.forEach(message => {
          newState['dm-history'][message.id] = message;
        })
      }

      return newState;

    case SEND:
      newState = {...state};

      if (action.message.type === 'live-chat') {
        newState['live-chat-history'][action.message.id] = action.message;
      } else newState['dm-history'][action.message.id] = action.message;

      return newState;

    default:
      return state;
  }
}
