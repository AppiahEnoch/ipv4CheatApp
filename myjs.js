var realInput = "";
var firstOctet = "";
var secondOctet = "";
var thirdOctet = "";
var forthOctet = "";

// label for storing results
var lbClass = "";
var lbMask = "";
var lbSubNet = "";
var lbTotalPosiblenetworks = "";
var lbHostBitValue = "";
var lbNumberOfHosts = "";

// label for referencing label containers
var lbJClass;
var lbJSubNet;
var lbJTotalPosiblenetworks;
var lbJHostBitValue;
var lbJNumberOfHosts;
var lbJmaskID;

// getTf into js
var nclass;
var tfHostBitsBorrowed;
var tfSubnetsneeded;
var tfNumberOfHostBits;

function getCurrentNodes() {
  nclass = document.querySelector("#nClassValue");
  tfSubnetsneeded = document.querySelector("#neededNetworkID");
  tfHostBitsBorrowed = document.querySelector("#hostBitBorrowedID");
  tfNumberOfHostBits = document.querySelector("#numberOfHostBitID");
}

// get label for referencing
function getLabelsIntoJs() {
  lbJNumberOfHosts = document.querySelector("#nHostValue");
  lbJSubNet = document.querySelector("#nSubnetValue");
  lbJmaskID = document.querySelector("#maskID");
}

function setCurrentNodes() {
  getLabelsIntoJs();

  nclass.innerHTML = lbClass;
  lbJNumberOfHosts.innerHTML = lbNumberOfHosts;
  lbJSubNet.innerHTML = lbSubNet;
  lbJmaskID.innerHTML = lbMask;
}

function getUserInput() {
  const userInput = document.querySelector("#addressID");
  realInput = userInput.value;
  getEachOctet();
}

function getEachOctet() {
  try {
    var fields = realInput.split(".");
    firstOctet = fields[0];
    secondOctet = fields[1];
    thirdOctet = fields[2];
    forthOctet = fields[3];
  } catch (e) {}
}

function show() {
  clearFilds();
  //alert(firstOctet + " " + secondOctet + "
  // " + thirdOctet + " " + forthOctet);

  if (validate()) {
    showDefaultIPV4Values();
    getCurrentNodes();

    getNetWorkClass();
    setCurrentNodes();
  } else {
    hideDefaultIPV4Values();
  }
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
function validate() {
  getUserInput();
  if (!isNumber(firstOctet)) {
    return false;
  } else if (!isNumber(secondOctet)) {
    return false;
  } else if (!isNumber(thirdOctet)) {
    return false;
  } else if (!isNumber(forthOctet)) {
    return false;
  }
  return true;
}

function isClassA() {
  if (firstOctet < 128 && firstOctet > 0) {
    lbClass = "A";
    lbMask = "255.0.0.0";
    lbNumberOfHosts = "16777214";
  }
}

function isClassB() {
  if (firstOctet > 128 && firstOctet <= 191) {
    lbClass = "B";
    lbMask = "255.255.0.0";
    lbNumberOfHosts = "65534";
  }
}
function isClassC() {
  if (firstOctet > 191 && firstOctet <= 223) {
    lbClass = "C";
    lbMask = "255.255.255.0";
    lbNumberOfHosts = "254";
  }
}
function isClassD() {
  if (firstOctet > 223 && firstOctet <= 239) {
    lbClass = "D";
  }
}

function isClassE() {
  if (firstOctet > 239 && firstOctet <= 255) {
    lbClass = "E";
  }
}

function getNetWorkClass() {
  isClassA();
  isClassB();
  isClassC();
  isClassD();
  isClassE();
}

function clearFilds() {
  var u = document.getElementById("addressID");
  var r = u.value;

  if (r == "") {
    lbClass = "";
    lbMask = "";
    lbNumberOfHosts = "";
    setCurrentNodes();
  }
}

function calculateHostsNeeded() {
  getCurrentNodes();
  var num = tfSubnetsneeded.value;

  if (!num == "") {
    if (isNumber(num)) {
      if (num >= 0) {
        var i = 0;
        var t = 2;
        var p = Math.pow(t, i);
        while (p <= num) {
          i++;
          p = Math.pow(t, i);
        }

        lbNumberOfHosts = i;
        setCurrentNodes();
        showSpecificValues();
      }
    }
  } else {
    lbNumberOfHosts = "";
    setCurrentNodes();
    hideSpecificValues();
  }
}

function calculateSubnet() {
  getCurrentNodes();
  var num = tfHostBitsBorrowed.value;
  if (!num == "") {
    if (isNumber(num)) {
      if (num >= 0) {
        var subnet = Math.pow(2, num);
        lbSubNet = subnet;
        setCurrentNodes();
        showSpecificValues();
      }
    }
  } else {
    lbSubNet = "";
    setCurrentNodes();
    hideSpecificValues();
  }
}

function calculatePossibleHostFromHostBit() {
  getCurrentNodes();
  var num = tfNumberOfHostBits.value;
  if (!num == "") {
    if (isNumber(num)) {
      if (num >= 0) {
        var host = Math.pow(2, num);
        host -= 2;
        lbNumberOfHosts = host;
        setCurrentNodes();
        showSpecificValues();
      }
    }
  } else {
    lbNumberOfHosts = "";
    setCurrentNodes();
    hideSpecificValues();
  }
}

function showDefaultIPV4Values() {
  var a = document.getElementsByClassName("generalIpv4");

  for (var i = 0; i < a.length; i++) {
    a[i].style.display = "block";
  }
  showSpecificValues();
}

function hideDefaultIPV4Values() {
  var a = document.getElementsByClassName("generalIpv4");

  for (var i = 0; i < a.length; i++) {
    a[i].style.display = "none";
  }

  hideSpecificValues();
}

function showSpecificValues() {
  var a = document.getElementsByClassName("specificResult");

  for (var i = 0; i < a.length; i++) {
    a[i].style.display = "block";
  }
}

function hideSpecificValues() {
  var a = document.getElementsByClassName("specificResult");

  for (var i = 0; i < a.length; i++) {
    a[i].style.display = "none";
  }
}
