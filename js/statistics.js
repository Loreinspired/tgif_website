statistics = {
    "democrats": {
        "total_democrats": 0,
        "voting_with_party_percentage": 0,
        "least_loyal": 0,
        "most_loyal": 0,
        "least_engaged": 0,
        "most_engaged": 0,
    },
    "republicans": {
        "total_republicans": 0,
        "voting_with_party_percentage": 0,
        "least_loyal": 0,
        "most_loyal": 0,
        "least_engaged": 0,
        "most_engaged": 0,
    },
    "independents": {
        "total_independents": 0,
        "voting_with_party_percentage": 0,
        "least_loyal": 0,
        "most_loyal": 0,
        "least_engaged": 0,
        "most_engaged": 0,
    },
    "totals": {
        "total_party_members": 0,
    }
}

function getPartyMemberList(politicalData, partyIndicator) {

    var memberList = [];

    for (i = 0; i < politicalData.results[0].members.length; i++) {
        if (politicalData.results[0].members[i].party.includes(partyIndicator)) {
            memberList.push(politicalData.results[0].members[i]);
        }
    }

    return memberList;
}

function getAveragePercentPartyVotes(politicalData, partyIndicator) {

    var totalMembersList = getPartyMemberList(politicalData, partyIndicator);
    var totalPercentage = 0;

    for (i = 0; i < politicalData.results[0].members.length; i++) {
        if (politicalData.results[0].members[i].party.includes(partyIndicator)) {
            var percentage = politicalData.results[0].members[i].votes_with_party_pct;
            totalPercentage = totalPercentage + percentage;
        }
    }

    var averagePercentage = totalPercentage / totalMembersList.length;

    return averagePercentage;
}

function findLeastLoyalMembers(politicalData, partyIndicator) {

    var leastLoyalMembers = [];
    var totalMembersList = getPartyMemberList(politicalData, partyIndicator);
    var membersCopy = getPartyMemberList(politicalData, partyIndicator).slice(0);

    var sortedMembers = membersCopy.sort(function (a, b) {
        return a.votes_with_party_pct - b.votes_with_party_pct;
    });

    for (var i = 0; i < sortedMembers.length; i++) {
        var tenPercent = (sortedMembers.length) * 0.1;
        if (leastLoyalMembers.length <= tenPercent) {
            leastLoyalMembers.push(sortedMembers[i]);
        }
    }

    return leastLoyalMembers;
}

function findMostLoyalMembers(politicalData, partyIndicator) {

    var mostLoyalMembers = [];
    var totalMembersList = getPartyMemberList(politicalData, partyIndicator);
    var membersCopy = getPartyMemberList(politicalData, partyIndicator).slice(0);

    var sortedMembers = membersCopy.sort(function (a, b) {
        return b.votes_with_party_pct - a.votes_with_party_pct;
    });

    for (var i = 0; i < sortedMembers.length; i++) {
        var tenPercent = (sortedMembers.length) * 0.1;
        if (mostLoyalMembers.length <= tenPercent) {
            mostLoyalMembers.push(sortedMembers[i]);
        }
    }

    return mostLoyalMembers;
}

function findLeastEngagedMembers(politicalData, partyIndicator) {

    var leastEngagedMembers = [];
    var totalMembersList = getPartyMemberList(politicalData, partyIndicator);
    var membersCopy = getPartyMemberList(politicalData, partyIndicator).slice(0);

    var sortedMembers = membersCopy.sort(function (a, b) {
        return b.missed_votes_pct - a.missed_votes_pct;
    });

    for (var i = 0; i < sortedMembers.length; i++) {
        var tenPercent = (sortedMembers.length) * 0.1;
        if (leastEngagedMembers.length <= tenPercent) {
            leastEngagedMembers.push(sortedMembers[i]);
        }
    }

    return leastEngagedMembers;
}

function findMostEngagedMembers(politicalData, partyIndicator) {

    var mostEngagedMembers = [];
    var totalMembersList = getPartyMemberList(politicalData, partyIndicator);
    var membersCopy = getPartyMemberList(politicalData, partyIndicator).slice(0);

    var sortedMembers = membersCopy.sort(function (a, b) {
        return a.missed_votes_pct - b.missed_votes_pct;
    });
    
    for (var i = 0; i < sortedMembers.length; i++) {
    var tenPercent = (sortedMembers.length) * 0.1;
        if (mostEngagedMembers.length <= tenPercent) {
            mostEngagedMembers.push(sortedMembers[i]);
        }
    }
    
    var lastElement = mostEngagedMembers[mostEngagedMembers.length - 1];
        
    for (var j = sortedMembers.indexOf(lastElement); j < sortedMembers.length; j++) {
        if (lastElement.missed_votes_pct === sortedMembers[j].missed_votes_pct) {
            mostEngagedMembers.push(sortedMembers[j]);
        }
    }
    
    return mostEngagedMembers;
}

//console.log(findMostEngagedMembers(senateData, "D"));


var allDemocrats = getPartyMemberList(senateData, "D");
statistics.democrats.total_democrats = allDemocrats.length;

var allRepublicans = getPartyMemberList(senateData, "R");
statistics.republicans.total_republicans = allRepublicans.length;

var allIndependents = getPartyMemberList(senateData, "I");
statistics.independents.total_independents = allIndependents.length;

var percentageDemocrats = getAveragePercentPartyVotes(senateData, "D");
statistics.democrats.voting_with_party_percentage = percentageDemocrats;

var percentageRepublicans = getAveragePercentPartyVotes(senateData, "R");
statistics.republicans.voting_with_party_percentage = percentageRepublicans;

var percentageIndependents = getAveragePercentPartyVotes(senateData, "I");
statistics.independents.voting_with_party_percentage = percentageIndependents;

var leastEngagedDemocrats = findLeastEngagedMembers(senateData, "D");
statistics.democrats.least_engaged = leastEngagedDemocrats;

var leastEngagedRepublicans = findLeastEngagedMembers(senateData, "R");
statistics.republicans.least_engaged = leastEngagedRepublicans;

var leastEngagedIndependents = findLeastEngagedMembers(senateData, "I");
statistics.independents.least_engaged = leastEngagedIndependents;

var mostEngagedDemocrats = findMostEngagedMembers(senateData, "D");
statistics.democrats.most_engaged = mostEngagedDemocrats;

var mostEngagedRepublicans = findMostEngagedMembers(senateData, "R");
statistics.republicans.most_engaged = mostEngagedRepublicans;

var mostEngagedIndependents = findMostEngagedMembers(senateData, "I");
statistics.independents.most_engaged = mostEngagedIndependents;

var leastLoyalDemocrats = findLeastLoyalMembers(senateData, "D");
statistics.democrats.least_loyal = leastLoyalDemocrats;

var leastLoyalRepublicans = findLeastLoyalMembers(senateData, "R");
statistics.republicans.least_loyal = leastLoyalRepublicans;

var leastLoyalIndependents = findLeastLoyalMembers(senateData, "I");
statistics.independents.least_loyal = leastLoyalIndependents;























