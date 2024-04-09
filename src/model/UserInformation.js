
// This class is used to store user information. It is used in the UserInformationService.js file to store user information in the database.
class UserInformation {
    constructor(employeeID, name, email, password, section, title, phoneNum, teamName, DOB, leaderboardPoints, awarded, awards, sessionKeys) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.section = section;
        this.title = title;
        this.phoneNum = phoneNum;
        this.teamName = teamName;
        this.DOB = DOB;
        this.employeeID = employeeID;
        this.leaderboardPoints = leaderboardPoints;
        this.awarded = awarded || false; // Default to false if not provided
        this.awards = awards || []; // Default to empty array if not provided
        this.sessionKeys = sessionKeys || []; // Default to empty array if not provided

    }
}

module.exports = UserInformation;