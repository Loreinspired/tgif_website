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

    var lastElement = leastEngagedMembers[leastEngagedMembers.length - 1];

    for (var j = sortedMembers.indexOf(lastElement); j < sortedMembers.length; j++) {
        if (lastElement.missed_votes_pct === sortedMembers[j].missed_votes_pct && lastElement != sortedMembers[j]) {
            leastEngagedMembersEngagedMembers.push(sortedMembers[j]);
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

