
// This class is used to store the information of a communication session between two users.
class CommunicationSession{
    constructor(chatter1, chatter2, chatLog, key){
        this.chatter1 = chatter1;
        this.chatter2 = chatter2;
        this.chatLog = chatLog;
        this.key = key;
    }
}

module.exports = CommunicationSession;