import json

fields = ["employeeId", "fName", "lName", "email", "division", "company", "profitCenter", "isActive", "licenceId"]

def create_obj(n):
    res = {
        "employeeId": n,
        "fName": "John",
        "lName": "Doe",
        "email": "name@email.com",
        "divison": "test",
        "company": "test",
        "profitCenter": "test",
        "isActive": True,
        "licenseId": 12345689
    }
    return res

final_dict = {"entries": [create_obj(n) for n in range(100)]}

with open("test_out", 'w') as json_file:
    json.dump(final_dict, json_file, indent=4)


"""
CREATE TABLE `Employee` (
    `employeeId` INT NOT NULL AUTO_INCREMENT,
    `fName` VARCHAR NOT NULL,
    `lName` VARCHAR NOT NULL,
    `email` VARCHAR NOT NULL,
    `division` VARCHAR NOT NULL,
    `company` VARCHAR NOT NULL,
    `profitCenter` VARCHAR NOT NULL,
    `isActive` BOOLEAN NOT NULL,
    `licenceId` INT NOT NULL,
    PRIMARY KEY (`employeeId`,`licenceId`)
);
"""