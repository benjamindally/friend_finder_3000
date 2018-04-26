var friendsData = require("../data/friends");

module.exports = function(app) {
  //This displays a JSON of all the possible friends in teh friendsData array
  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  app.post("/api/friends", function(req, res) {
    var lastAdded = req.body;
    var userResponses = lastAdded.surveyArray;

    // Compute best friend match
    var matchName = "";
    var matchImage = "";
    var totalDifference = 10000;

    // Examine all existing friends in the list
    for (var i = 0; i < friendsData.length; i++) {
      // Compute differenes for each question
      var difference = 0;
      for (var j = 0; j < userResponses.length; j++) {
        difference += Math.abs(
          friendsData[i].surveyArray[j] - userResponses[j]
        );
      }

      if (difference < totalDifference) {
        totalDifference = difference;
        matchName = friendsData[i].userName;
        matchImage = friendsData[i].userPhoto;
        console.log(matchName);
      }
    }

    // Add new user
    friendsData.push(lastAdded);
    res.json({ matchName: matchName, matchImage: matchImage });
  });
};
