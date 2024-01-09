/** ChatUser is an individual connection from client -> server to chat. */

class ChatUser {
  // ... existing code ...

  /** Handle messages from client:
   *
   * - {type: "join", name: username} : join
   * - {type: "chat", text: msg }     : chat
   * - {type: "members"}              : list members
   */
  handleMessage(jsonData) {
    let msg = JSON.parse(jsonData);

    if (msg.type === 'join') this.handleJoin(msg.name);
    else if (msg.type === 'chat') this.handleChat(msg.text);
    else if (msg.type === 'members') this.handleMembersRequest();
    else throw new Error(`bad message: ${msg.type}`);
  }

  /** Handle the /members command: return a list of usernames in the current room. */
  handleMembersRequest() {
    const membersList = this.room.members.map(user => user.name).join(', ');
    this.send({
      name: 'Server',
      type: 'chat',
      text: `In room: ${membersList}`
    });
  }

  // ... existing code ...
}

module.exports = ChatUser;
