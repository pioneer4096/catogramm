let counter = 1;

export default {
  state: {
    messages: [],
  },
  actions: {},
  mutations: {
    addNotification(state, text) {
      state.messages.push({
        id: counter++,
        text,
        read: 0,
      });
    },
    readNotification(state, id) {
      const notification = state.messages.find(message => message.id === id);
      if (notification) {
        notification.read = 1;
      }
    },
  },
  getters: {
    notificationMessagesUnread: (s) => s.messages.filter((m) => !m.read),
    notificationMessagesUnreadMax: (s) => s.messages.filter((m) => !m.read).slice(0,5),
    notificationMessagesUnreadLength: (s) =>
      s.messages.filter((m) => !m.read).length,
  },
};
