var data;

var urlSenate = 'https://api.propublica.org/congress/v1/113/senate/members.json';
var urlHouse = 'https://api.propublica.org/congress/v1/113/house/members.json';

if (document.title.includes("Senate")) {
    console.log('use senate data');
    url = urlSenate;
} 

if (document.title.includes("House")) {
    console.log('use house data');
    url = urlHouse;
}

var request = {
        method: 'GET',
        body: JSON.stringify(data),
        headers: {
            'X-API-KEY': 'AnhSDU3Px44f459F8NFIn15ibKvCRdPC7l8f97MG'
        }
        };

fetch(url, request)
    .then(response => response.json())
    .then(data => {
        if (document.title === "Senate" || document.title === "House") {
            initializeMembersTable(data);
            document.getElementById("democrat").addEventListener("click", function() { applyPartyAndStateFilters(data) });
            document.getElementById("republican").addEventListener("click", function() { applyPartyAndStateFilters(data) });
            document.getElementById("independent").addEventListener("click", function() { applyPartyAndStateFilters(data) });
            document.getElementById("state-filter").addEventListener("change", function() { applyPartyAndStateFilters(data) });
        }
        if (document.title.includes("Attendance") || document.title.includes("Loyalty")) {
            calculateStatistics(data);
            atAGlanceTable(data);
        }
        if (document.title.includes("Attendance")) {
            leastEngagedTable(data);
            mostEngagedTable(data);            
        }
        if (document.title.includes("Loyalty")) {
            leastLoyalTable(data);
            mostLoyalTable(data);
        }
    })
    .catch(error => {
        console.log(error);
    })

function applyPartyAndStateFilters(anObject) {

    var selectedParties = document.querySelectorAll('input[name=checkboxes]:checked');
    var selectedState = document.getElementById('state-filter').value;

    var membersToDisplay = [];
    var members = anObject.results[0].members;

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

    var tblHeader = document.createElement('thead');
    var headerRow = document.createElement('tr');

    for (var j = 0; j < headerTitles.length; j++) {
        var newTitle = document.createElement('th');
        newTitle.innerHTML = headerTitles[j];
        headerRow.appendChild(newTitle);
    }

    tblHeader.appendChild(headerRow);

    tbl.appendChild(tblHeader);
}

function initializeMembersTable(anObject) {

    var headerTitles = ['Name', 'Party', 'State', 'Years in Office', '% Votes w/ Party'];
    var tbl = document.getElementById('table-data');

    createHeader(headerTitles, tbl);

    addMembersToTable(anObject.results[0].members, tbl);
    getStateDropdown(anObject);
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

    stateList.sort();

    // then create filter option for each state
    for (j = 0; j < stateList.length; j++) {
        createStateFilterOption(stateList[j]);
    }

    console.log(stateList);
}

function sortTable() {

    var rows, switching, shouldSwitch, i, x, y;
    var table = document.getElementById("table-data");

    switching = true;

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < rows.length - 1; i++) {
            x = rows[i].getElementsByTagName('a')[0];
            y = rows[i + 1].getElementsByTagName('a')[0];
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

//showTableWithRelevantData();
