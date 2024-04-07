class UserInformation {
    constructor(employeeID, name, email, password, section, title, phoneNum, teamName, DOB ) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.section = section;
        this.title = title;
        this.phoneNum = phoneNum;
        this.teamName = teamName;
        this.DOB = DOB;
        this.employeeID = employeeID;
    }
}

module.exports = UserInformation;