function getMembersFromMultipleSelectedParties(selectedParties) {
    
    var membersFromSelectedParties = [];

    for (var i = 0; i < selectedParties.length; i++) {
        var selectedParty = selectedParties[i].value;
        var partyMembers = getMembersForASingleParty(selectedParty);
        Array.prototype.push.apply(membersFromSelectedParties, partyMembers);
    }
    
    return membersFromSelectedParties;
}

function getMembersForASingleParty(partyIndicator) {
    
    var allMembers = data.results[0].members;
    var matchedPartyMembers = [];

    for (var i = 0; i < allMembers.length; i++) {
        if (allMembers[i].party.includes(partyIndicator)) {
            var member = allMembers[i];
            matchedPartyMembers.push(member);
        }
    }
        
    return matchedPartyMembers;
}

function getMembersForASingleState(stateIndicator, preFilteredMembers) {
    
    var matchedMembersFromState = [];
    
    for (var i = 0; i < preFilteredMembers.length; i++) {
        if (preFilteredMembers[i].state.includes(stateIndicator)) {
            var member = preFilteredMembers[i];
            matchedMembersFromState.push(member);
        }
    }
        
    return matchedMembersFromState;
}