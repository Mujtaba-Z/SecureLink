
// This class is used to store the information of a communication session between two users.
class CommunicationSession{
    constructor(chatter1, chatter2, chatLog, key, creationTime, name, chatID, chatter1Name, chatter2Name){
        this.chatter1 = chatter1;
        this.chatter2 = chatter2;
        this.chatLog = chatLog;
        this.key = key;
        this.creationTime = creationTime;
        this.chatID = chatID;
        this.chatter1Name = chatter1Name;
        this.chatter2Name = chatter2Name;
    }
}

module.exports = CommunicationSession;