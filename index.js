var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("dbtest");
    // var collection = dbo.collection("player");

    // 1) Suppose there is a dearth in willow production this year and the bat manufacturer can only supply bats for either right-handed 
    // or left-handed batsmen but not both. Write a query for the bat manufacturer that groups the players by batting hand so that you 
    // can inform him which kind of bat he should put into production to gain maximum revenue.
    // collection.aggregate([
    //     {
    //         $group: {
    //             _id: { Batting_Hand: "$Batting_Hand"  },
    //             playerCountByBattingHand: { $sum: 1 }
    //         }
    //     }
    // ]).toArray().then((result) => {
    //     console.log(result);
    // });



    // 2) There is talk of adding cricket to the Olympic sports. But before a conclusive decision can be made, 
    // the Olympic board needs to find out if its even feasible to do so. Write a query for the Olympic board informing them of 
    // the number of players in each country.
    // collection.aggregate([
    //     {
    //         $group: {
    //             _id: { Country: "$Country"  },
    //             playerCountByBattingHand: { $sum: 1 }
    //         }
    //     }
    // ]).toArray().then((result) => {
    //     console.log(result);
    // });


    // 3) The Olympic board is well aware of the willow crisis. Therefore, to be on the safe side, they have one more request for you. 
    // They would like to know the number of players of each country that bat with a given hand.
    // collection.aggregate([
    //     {
    //         $group: {
    //             _id: { Country: "$Country",
    //             Batting_Hand: "$Batting_Hand"},
    //             playerCountByBattingHand: { $sum: 1 }
    //         }
    //     }
    // ]).toArray().then((result) => {
    //     console.log(result);
    // });


    // 4) We have observed NULL values in our previous results and even though it's important for us as database engineers to 
    // know what data is missing, our end users like the bat manufacturer or the Olympic board can't really do much with the NULL values. 
    // Let's improve our queries then to exclude the NULL values when grouping the players by batting hand.
    // collection.aggregate([
    //     {
    //         $match:
    //             { Batting_Hand: { $ne: null } }
    //     },
    //     {
    //         $group: {
    //             _id: {
    //                 Country: "$Country",
    //                 Batting_Hand: "$Batting_Hand"
    //             },
    //             playerCountByBattingHand: { $sum: 1 }
    //         }
    //     }
    // ]).toArray().then((result) => {
    //     console.log(result);
    // });


    // 5) Similar to Exercise 4, let's count the number of players by non null country.
    // collection.aggregate([
    //     {
    //         $match:
    //             { Country: { $ne: null } }
    //     },
    //     {
    //         $group: {
    //             _id: {
    //                 Country: "$Country",
    //                 Batting_Hand: "$Batting_Hand"
    //             },
    //             playerCount: { $sum: 1 }
    //         }
    //     }
    // ]).toArray().then((result) => {
    //     console.log(result);
    // });


    // 6) One last thing we can do to ease readability for the Olympic board is to sort the players in alphabetical order in addition 
    // to all the changes we implemented previously. Put all your knowledge together and count number of players of each country that bat with 
    // a given hand. Remove null values of Batting_Hand and sort the output in alphabetical order. 
    // collection.aggregate([
    //     {
    //         $match:
    //             { Batting_Hand: { $ne: null } }
    //     },
    //     {
    //         $group: {
    //             _id: {
    //                 Country: "$Country",
    //                 Batting_Hand: "$Batting_Hand"
    //             },
    //             playerCount: { $sum: 1 }
    //         }
    //     },
    //     {
    //         $sort: {
    //             _id: 1
    //         }
    //     }
    // ]).toArray().then((result) => {
    //     console.log(result);
    // });


    // 7) Our employees are members of different departments. Deconstruct the deparments array such that there is a separate document 
    // for each department an employee belongs to. 
    // var collection = dbo.collection("employee");
    // collection.aggregate([
    //     {
    //         $unwind: "$departments"
    //     }
    // ]).toArray().then((result) => {
    //     console.log(result);
    // });


    // 8) In order to find an object's location in an array, include the index position. 
    // var collection = dbo.collection("employee");
    // collection.aggregate([
    //     {
    //         $unwind: {
    //             path: "$departments", 
    //             includeArrayIndex: "arrayIndex"
    //         }
    //     }
    // ]).toArray().then((result) => {
    //     console.log(result);
    // });


    // 9) Let's crunch some numbers! Count the number of departments an employee belongs to.
    // var collection = dbo.collection("employee");
    // collection.aggregate([
    //     { $unwind: "$departments" },
    //     {
    //         $group:
    //         {
    //             _id: { firstName: "$name" },
    //             numberOfDepartments: { $sum: 1 }
    //         }
    //     }
    // ]).toArray().then((result) => {
    //     console.log(result);
    // });

    // 10) Write a query that counts the number of employees in each department. To make things more interesting, perform this action 
    // only against employees having empno greater than or equal to 3.
    var collection = dbo.collection("employee");
    collection.aggregate([
        { $unwind: "$departments" },
        {
            $match:
                { empno: { $gte: 3 } }
        },
        {
            $group:
            {
                _id: { departmentName: "$departments" },
                numberOfEmployees: { $sum: 1 }
            }
        }
    ]).toArray().then((result) => {
        console.log(result);
    });


});