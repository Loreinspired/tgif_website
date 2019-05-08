statistics = {
    "democrats": {
        "total_democrats": 0,
        "voting_with_party_percentage": 0,
    },
    "republicans": {
        "total_republicans": 0,
        "voting_with_party_percentage": 0,
    },
    "independents": {
        "total_independents": 0,
        "voting_with_party_percentage": 0,
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

var allDemocrats = getPartyMemberList(senateData, "D");
statistics.democrats.total_democrats = allDemocrats.length;

var allRepublicans = getPartyMemberList(senateData, "R");
statistics.republicans.total_republicans = allRepublicans.length;

var allIndependents = getPartyMemberList(senateData, "I");
statistics.independents.total_independents = allIndependents.length;

//console.log(JSON.stringify(statistics.democrats.total_democrats));
//console.log(JSON.stringify(statistics.republicans.total_republicans));
//console.log(JSON.stringify(statistics.independents.total_independents));



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

//console.log(getAveragePercentPartyVotes(senateData, "D"));
//console.log(getAveragePercentPartyVotes(senateData, "R"));
//console.log(getAveragePercentPartyVotes(senateData, "I"));

var percentageDemocrats = getAveragePercentPartyVotes(senateData, "D");
statistics.democrats.voting_with_party_percentage = percentageDemocrats;

var percentageRepublicans = getAveragePercentPartyVotes(senateData, "R");
statistics.republicans.voting_with_party_percentage = percentageRepublicans;

var percentageIndependents = getAveragePercentPartyVotes(senateData, "I");
statistics.independents.voting_with_party_percentage = percentageIndependents;

console.log(JSON.stringify(statistics.democrats.voting_with_party_percentage));
console.log(JSON.stringify(statistics.republicans.voting_with_party_percentage));
console.log(JSON.stringify(statistics.independents.voting_with_party_percentage));





































