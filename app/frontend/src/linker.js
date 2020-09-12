var path = require("path");
const https = require("http");
const { DH_CHECK_P_NOT_PRIME } = require("constants");
var package = "";
var searchPackage = "";
var venvFlag = false;
var pythonPath;
var pipPrefix = "pip";
var counter = 1;
function browseResult(e) {
  let filePath = e.target.files[0].path;
  var to = filePath.lastIndexOf("\\");
  to = to == -1 ? filePath.length : to + 1;
  filePath = filePath.substring(0, to);
  pythonPath = filePath;
  venvCondition();
}
function choose(selectObject) {
  console.log(selectObject.value);
  if (selectObject.value === "add") {
    venvFlag = true;
    document.getElementById("file-input").click();
  }
  if (selectObject.value === "global") {
    pipPrefix = "pip";
    pip_freeze();
  }
  else{
    pipPrefix = selectObject.value + "Scripts/python -m pip";
    pip_freeze();
  }
  
}
function venvCondition() {
  if (venvFlag === true) {
    pipPrefix = pythonPath + "Scripts/python -m pip";
    localStorage.setItem(counter, pythonPath);
    var newvenv = document.createElement("option");
    newvenv.setAttribute("value", pythonPath);
    newvenv.innerText = pythonPath;
    document
      .getElementById("global")
      .insertAdjacentElement("afterend", newvenv);
    counter = counter + 1;
    pip_freeze();
  } else {
    
  }
}

function pip_freeze() {
  const list = document.getElementById("packageContainer");
  list.innerHTML = "";
  const exec = require("child_process").exec;
  const command = pipPrefix + " freeze";
  exec(command, (err, stdout, stderr) => {
    var temp = stdout.split("\n");
    for (var i = 0; i < temp.length; i++) {
      var item = document.createElement("p");
      item.appendChild(document.createTextNode(temp[i]));
      item.addEventListener(
        "contextmenu",
        function (e) {
          let packageFullName = e.srcElement.innerHTML;
          package = packageFullName.slice(0, packageFullName.indexOf("="));
          console.log(package);
          document.getElementById("rmenu").className = "show";
          document.getElementById("rmenu").style.top = mouseY(event) + "px";
          document.getElementById("rmenu").style.left = mouseX(event) + "px"; //here you draw your own menu
          e.preventDefault();
        },
        false
      );
      list.appendChild(item);
      item.addEventListener("click", function () {
        document.getElementById("rmenu").className = "hide";
      });
    }
    // console.log('\nstderr for freeze: \n' + stderr)
    if (err !== null) {
      console.log("\nexec error for freeze: \n" + err);
    }
  });
}
function mouseX(evt) {
  if (evt.pageX) {
    return evt.pageX;
  } else if (evt.clientX) {
    return (
      evt.clientX +
      (document.documentElement.scrollLeft
        ? document.documentElement.scrollLeft
        : document.body.scrollLeft)
    );
  } else {
    return null;
  }
}

function mouseY(evt) {
  if (evt.pageY) {
    return evt.pageY;
  } else if (evt.clientY) {
    return (
      evt.clientY +
      (document.documentElement.scrollTop
        ? document.documentElement.scrollTop
        : document.body.scrollTop)
    );
  } else {
    return null;
  }
}
function pip_install() {
  console.log(searchPackage);
  let command = pipPrefix + " install " + searchPackage;
  const exec = require("child_process").exec;
  exec(command, (err, stdout, stderr) => {
    console.log("\nstdout for iur: \n" + stdout);
    console.log("\nstderr for iur: \n" + stderr);
    if (err !== null) {
      console.log("\nexec error for iur: \n" + err);
    }
    if (stderr && stdout) {
      alert(stdout);
      pip_freeze();
    } else if (stderr) {
      alert(stderr);
    } else if (stdout) {
      alert(stdout);
      pip_freeze();
    }
  });
  document.getElementById("smenu").className = "hide";
}

function pip_uninstall() {
  console.log(package);
  let command = pipPrefix + " uninstall " + package + " -y";
  const exec1 = require("child_process").exec;
  exec1(command, (err1, stdout1, stderr1) => {
    console.log("\nstdout for iur: \n" + stdout1);
    console.log("\nstderr for iur: \n" + stderr1);
    if (err1 !== null) {
      console.log("\nexec error for iur: \n" + err);
    }
    if (stderr1 && stdout1) {
      alert(stdout1);
      pip_freeze();
    } else if (stderr1) {
      alert(stderr1);
    } else if (stdout1) {
      alert(stdout1);
      pip_freeze();
    }
  });
  document.getElementById("rmenu").className = "hide";
  document.getElementById("smenu").className = "hide";
}

function pip_upgrade() {
  console.log(package);
  let command = "pip install " + package + " --upgrade";
  const exec2 = require("child_process").exec;
  exec2(command, (err3, stdout3, stderr3) => {
    console.log("\nstdout for iur: \n" + stdout3);
    console.log("\nstderr for iur: \n" + stderr3);
    if (err3 !== null) {
      console.log("\nexec error for iur: \n" + err);
    }
    if (stderr3 && stdout3) {
      alert(stdout3);
      pip_freeze();
    } else if (stderr3) {
      alert(stderr3);
    } else if (stdout3) {
      alert(stdout3);
      pip_freeze();
    }
  });
  document.getElementById("rmenu").className = "hide";
  document.getElementById("smenu").className = "hide";
}
function pip_gen_req() {
  const exec = require("child_process").exec;
  const cmd = "pip freeze > requirements.txt";
  exec(cmd, (err, stdout, stderr) => {
    var temp = stdout.split("\n");
    console.log("\nstdout for gen req: \n" + temp);
    // console.log('\nstderr for gen req: \n' + stderr)
    if (err !== null) {
      console.log("\nexec error for gen req: \n" + err);
    }
  });
}

function pip_use_req() {
  const exec = require("child_process").exec;
  const cmd = "pip install -r requirements.txt";
  exec(cmd, (err, stdout, stderr) => {
    console.log("\nstdout for use req: \n" + stdout);
    console.log("\nstderr for use req: \n" + stderr);
    if (err !== null) {
      console.log("\nexec error for use req: \n" + err);
    }
  });
}

function pip_outdated(command) {
  const exec = require("child_process").exec;
  exec(command, (err, stdout, stderr) => {
    temp = stdout.split("\n");
    for (i = 2; i < temp.length - 1; i++) {
      temp1 = temp[i].split(" ");
      console.log(temp1[0]);
    }
  });
}

function searchEvent(e) {
  var el = document.getElementById("search").value;
  document.getElementById("searchContainer").innerHTML = "";
  let results;
  fetch(`http://localhost:5000/autocomplete?word=${el}`)
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      const list = document.getElementById("searchContainer");
      for (var i = 0; i < responseData.length; i++) {
        var item = document.createElement("p");
        item.appendChild(document.createTextNode(responseData[i]));
        item.addEventListener(
          "contextmenu",
          function (e) {
            console.log(e);
            searchPackage = e.srcElement.innerHTML;
            document.getElementById("description").innerText = "lorem ipsum";
            document.getElementById("smenu").className = "show";
            document.getElementById("smenu").style.top = mouseY(event) + "px";
            document.getElementById("smenu").style.left = mouseX(event) + "px"; //here you draw your own menu
            e.preventDefault();
          },
          false
        );
        list.appendChild(item);
        item.addEventListener("click", function () {
          document.getElementById("smenu").className = "hide";
        });
      }
    });
}
