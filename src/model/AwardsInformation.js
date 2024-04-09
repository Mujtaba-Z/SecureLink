
// This class is used to store the information of the awards that are given to the employees.
class AwardsInformaton{
    constructor(points, awardsInfo, employeeID, awarded, name){
        this.points = points;
        this.awardsInfo = awardsInfo;
        this.employeeID = employeeID;
        this.awarded = awarded;
        this.name = name;
    }
}

module.exports = AwardsInformaton;