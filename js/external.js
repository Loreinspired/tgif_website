function applyPartyandStateFilters(politicalData) {
    
    var selectedParties = document.querySelectorAll('input[name=checkboxes]:checked');
    var selectedState = document.getElementById('state-filter').value;

    var membersToDisplay = [];
    var members = politicalData.results[0].members;
    
    if (selectedParties.length === 0) {
        membersToDisplay = members;
    } else {
        membersToDisplay = getMembersFromMultipleSelectedParties(members, selectedParties);
    }
    
    if (selectedState != "") {
        membersToDisplay = getMembersForASingleState(selectedState, membersToDisplay);
    }

    clearTableBody();
    
    var tbl = document.getElementById('table-data');
    addMembersToTable(membersToDisplay, tbl);
}

function getMembersFromMultipleSelectedParties(members, selectedParties) {
    
    var membersFromSelectedParties = [];

    for (var i = 0; i < selectedParties.length; i++) {
        var selectedParty = selectedParties[i].value;
        var partyMembers = getMembersForASingleParty(members, selectedParty);
        Array.prototype.push.apply(membersFromSelectedParties, partyMembers);
    }
    
    return membersFromSelectedParties;
}

function getMembersForASingleParty(members, partyIndicator) {
    
//    var allMembers = anObject.results[0].members;
    var matchedPartyMembers = [];

    for (var i = 0; i < members.length; i++) {
        if (members[i].party.includes(partyIndicator)) {
            var member = members[i];
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

function createCell(text, row) {

    var cell = document.createElement('td');
    var cellText = document.createTextNode(text);
    cell.appendChild(cellText);
    row.appendChild(cell);
}

function createNameCell(url, text, row) {
    
    var nameCell = document.createElement('td');
    var nameLink = document.createElement('a');
    nameLink.text = text;
    nameLink.href = url;
 
    nameCell.appendChild(nameLink);
    row.appendChild(nameCell);
}

function createHeader(headerTitles, tbl) {

    var tblHeader = document.getElementById('table-head');
    var headerRow = document.createElement('tr');

    for (var j = 0; j < headerTitles.length; j++) {
        var newTitle = document.createElement('th');
        newTitle.innerHTML = headerTitles[j];
        headerRow.appendChild(newTitle);
    }

    // add header row to table header
    tblHeader.appendChild(headerRow);

    // put the header in the table
    tbl.appendChild(tblHeader);
}

function initializeMembersTable(anObject) {

    var headerTitles = ['Name', 'Party', 'State', 'Years in Office', '% Votes w/ Party'];
    var tbl = document.getElementById('table-data');

    createHeader(headerTitles, tbl);

    addMembersToTable(anObject.results[0].members, tbl);
}

function addMembersToTable(members, tbl) {
    
    var tblBody = document.getElementById('table-body');
    
    // for each member, build a TR element
    for (var i = 0; i < members.length; i++) {
        var row = tbl.insertRow();

        var fullName = members[i].first_name + ' ' + (members[i].middle_name || "") + ' ' + members[i].last_name;
        var memberUrl = members[i].url;      
        
        createNameCell(memberUrl, fullName, row);
        createCell(members[i].party || "", row);
        createCell(members[i].state || "", row);
        createCell(members[i].seniority || "", row);
        createCell(members[i].votes_with_party_pct + ' %' || "", row);

        // add the row to the end of the table body
        tblBody.appendChild(row);
    }

    // put the tbody in the table
    tbl.appendChild(tblBody);
}

function clearTableBody() {
    document.getElementById('table-body').innerHTML = "";
}

function createStateFilterOption(text) {
    
    var stateDropdown = document.getElementById('state-filter');
    var stateOption = document.createElement('option');
    
    stateOption.setAttribute('value', text);
    
    if (text === "") {
        text = "Select All";
    }
    
    var stateText = document.createTextNode(text);
    
    stateOption.appendChild(stateText);
    stateDropdown.add(stateOption);
}

function getStateDropdown(anObject) {
    
    var stateList = [];
    stateList.push("");
    
    for (var i = 0; i < anObject.results[0].members.length; i++) {
        var stateCode = anObject.results[0].members[i].state;   
        // only add state to list if it is not already in the list
        if (stateList.includes(stateCode) === false) {
            stateList.push(stateCode);
        }
    }
    
    // sort states alphabetically
    stateList.sort();
    
    // then create filter option for each state
    for (j = 0; j < stateList.length; j++) {
        createStateFilterOption(stateList[j]);
    }
    
    console.log(stateList);
}

function showTableWithRelevantData() {
    
    if (document.title === "Senate") {
        console.log('use senate data');
        initializeMembersTable(senateData);
        getStateDropdown(senateData);
    } 
    
    if (document.title === "House") {
        console.log('use house data');
        initializeMembersTable(houseData);
        getStateDropdown(houseData);
    }
    
}

showTableWithRelevantData();


//console.log(document.title);

























