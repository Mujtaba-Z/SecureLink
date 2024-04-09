
// This class is used to store the information of a communication session between two users.
class CommunicationSession{
    constructor(chatter1, chatter2, chatLog, key, creationTime, name, chatID){
        this.chatter1 = chatter1;
        this.chatter2 = chatter2;
        this.chatLog = chatLog;
        this.key = key;
        this.creationTime = creationTime;
        this.name = name;
        this.chatID = chatID;
    }
}

module.exports = CommunicationSession;