statistics = {
    "parties":
        [
            {   "title": "Democrats",
                "total_reps": 0,
                "votes_percentage": 0 
            },
            {   "title": "Republicans",
                "total_reps": 0,
                "votes_percentage": 0
            },
            {   "title": "Independents",
                "total_reps": 0,
                "votes_percentage": 0
            },
            {   "title": "Total",
                "total_reps": 0,
                "votes_percentage": 0 
            }
        ],
}

var allDemocrats = getPartyMemberList(senateData, "D");
statistics.parties[0].total_reps = allDemocrats.length;

var allRepublicans = getPartyMemberList(senateData, "R");
statistics.parties[1].total_reps = allRepublicans.length;

var allIndependents = getPartyMemberList(senateData, "I");
statistics.parties[2].total_reps = allIndependents.length;

statistics.parties[3].total_reps = senateData.results[0].members.length;

var percentageDemocrats = getAveragePercentPartyVotes(senateData, "D");
statistics.parties[0].votes_percentage = parseFloat(Math.round(percentageDemocrats * 100) / 100).toFixed(2);

var percentageRepublicans = getAveragePercentPartyVotes(senateData, "R");
statistics.parties[1].votes_percentage = parseFloat(Math.round(percentageRepublicans * 100) / 100).toFixed(2);

var percentageIndependents = getAveragePercentPartyVotes(senateData, "I");
statistics.parties[2].votes_percentage = parseFloat(Math.round(percentageIndependents * 100) / 100).toFixed(2);

var averagePercentage = (percentageDemocrats + percentageRepublicans + percentageIndependents) / 3;
statistics.parties[3].votes_percentage = parseFloat(Math.round(averagePercentage * 100) / 100).toFixed(2);

//var leastEngagedMembers = findLeastEngagedMembersAllParties(senateData);
//statistics.all_parties.least_engaged = leastEngagedMembers;
//
//var mostEngagedMembers = findMostEngagedMembersAllParties(senateData);
//statistics.all_parties.most_engaged = mostEngagedMembers;
//
//var leastLoyalMembers = findLeastLoyalMembersAllParties(senateData);
//statistics.party.all_parties.least_loyal = leastLoyalMembers;
//
//var mostLoyalMembers = findMostLoyalMembersAllParties(senateData);
//statistics.party.all_parties.most_loyal = mostLoyalMembers;

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

    var lastElement = leastLoyalMembers[leastLoyalMembers.length - 1];

    for (var j = sortedMembers.indexOf(lastElement); j < sortedMembers.length; j++) {
        if (lastElement.votes_with_party_pct === sortedMembers[j].votes_with_party_pct && lastElement != sortedMembers[j]) {
            leastLoyalMembers.push(sortedMembers[j]);
        }
    }

    return leastLoyalMembers;
}

function findLeastLoyalMembersAllParties(politicalData) {

    var leastLoyalMembers = [];
    var membersCopy = politicalData.results[0].members.slice(0);

    var sortedMembers = membersCopy.sort(function (a, b) {
        return a.votes_with_party_pct - b.votes_with_party_pct;
    });

    for (var i = 0; i < sortedMembers.length; i++) {
        var tenPercent = (sortedMembers.length) * 0.1;
        if (leastLoyalMembers.length <= tenPercent) {
            leastLoyalMembers.push(sortedMembers[i]);
        }
    }

    var lastElement = leastLoyalMembers[leastLoyalMembers.length - 1];

    for (var j = sortedMembers.indexOf(lastElement); j < sortedMembers.length; j++) {
        if (lastElement.votes_with_party_pct === sortedMembers[j].votes_with_party_pct && lastElement != sortedMembers[j]) {
            leastLoyalMembers.push(sortedMembers[j]);
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

function findMostLoyalMembersAllParties(politicalData) {

    var mostLoyalMembers = [];
    var membersCopy = politicalData.results[0].members.slice(0);

    var sortedMembers = membersCopy.sort(function (a, b) {
        return b.votes_with_party_pct - a.votes_with_party_pct;
    });

    for (var i = 0; i < sortedMembers.length; i++) {
        var tenPercent = (sortedMembers.length) * 0.1;
        if (mostLoyalMembers.length <= tenPercent) {
            mostLoyalMembers.push(sortedMembers[i]);
        }
    }

    var lastElement = mostLoyalMembers[mostLoyalMembers.length - 1];

    for (var j = sortedMembers.indexOf(lastElement); j < sortedMembers.length; j++) {
        if (lastElement.votes_with_party_pct === sortedMembers[j].votes_with_party_pct && lastElement != sortedMembers[j]) {
            mostLoyalMembers.push(sortedMembers[j]);
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

    var lastElement = leastEngagedMembers[leastEngagedMembers.length - 1];

    for (var j = sortedMembers.indexOf(lastElement); j < sortedMembers.length; j++) {
        if (lastElement.missed_votes_pct === sortedMembers[j].missed_votes_pct && lastElement != sortedMembers[j]) {
            leastEngagedMembersEngagedMembers.push(sortedMembers[j]);
        }
    }

    return leastEngagedMembers;
}

function findLeastEngagedMembersAllParties(politicalData) {

    var leastEngagedMembers = [];
    var membersCopy = politicalData.results[0].members.slice(0);

    var sortedMembers = membersCopy.sort(function (a, b) {
        return b.missed_votes_pct - a.missed_votes_pct;
    });

    for (var i = 0; i < sortedMembers.length; i++) {
        var tenPercent = (sortedMembers.length) * 0.1;
        if (leastEngagedMembers.length <= tenPercent) {
            leastEngagedMembers.push(sortedMembers[i]);
        }
    }

    var lastElement = leastEngagedMembers[leastEngagedMembers.length - 1];

    for (var j = sortedMembers.indexOf(lastElement); j < sortedMembers.length; j++) {
        if (lastElement.missed_votes_pct === sortedMembers[j].missed_votes_pct && lastElement != sortedMembers[j]) {
            leastEngagedMembers.push(sortedMembers[j]);
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
        if (lastElement.missed_votes_pct === sortedMembers[j].missed_votes_pct && lastElement != sortedMembers[j]) {
            mostEngagedMembers.push(sortedMembers[j]);
        }
    }

    return mostEngagedMembers;
}

function findMostEngagedMembersAllParties(politicalData) {

    var mostEngagedMembers = [];
    var membersCopy = politicalData.results[0].members.slice(0);

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
        if (lastElement.missed_votes_pct === sortedMembers[j].missed_votes_pct && lastElement != sortedMembers[j]) {
            mostEngagedMembers.push(sortedMembers[j]);
        }
    }

    return mostEngagedMembers;
}


function createHeader(headerTitles, table) {

    var headerRow = document.createElement('tr');

    headerTitles.forEach(function (header) {
        var newTitle = document.createElement('th');
        newTitle.innerHTML = header;
        headerRow.appendChild(newTitle);
    });
    
    table.appendChild(headerRow);
}

function senateAtAGlanceTable(storedData) {
    
    var table = document.getElementById('senate_at_a_glance');
    var headerTitles = ['Party', 'No. of Reps', '% Voted /w Party'];

    var tableBody = document.createElement('tbody');
    
    createHeader(headerTitles, table);
    
    var values = Object.values(statistics.parties);
    console.log(values);
    
    for (var i = 0; i < values.length; i++) {
        var row = document.createElement('tr');
        
        var titleCell = document.createElement('td');
        titleCell.innerHTML = values[i].title;
        row.appendChild(titleCell);
        
        var repsCell = document.createElement('td');
        repsCell.innerHTML = values[i].total_reps;
        row.appendChild(repsCell);

        var percentageCell = document.createElement('td');
        percentageCell.innerHTML = values[i].votes_percentage;
        row.appendChild(percentageCell);

        
        tableBody.appendChild(row);
    }

    table.appendChild(tableBody);
}

senateAtAGlanceTable(statistics);























