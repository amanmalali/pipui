var path = require("path");
const https = require("http");
const { DH_CHECK_P_NOT_PRIME } = require("constants");
var package = "";
var searchPackage = "";
var packageTitle = "";
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
  } else {
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
function browseRequirements(e) {
  let filePath = e.target.files[0].path;
  let fileExtension = filePath.split(".").pop();
  if (fileExtension === "txt") {
    pip_use_req(filePath);
  } else {
    alert("Invalid File!");
  }
}
function startServer() {
  const exec = require("child_process").exec;
  const command = "server.exe";
  exec(command, { cwd: "./server" }, (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (err !== null) {
      console.log("\nexec error for freeze: \n" + err);
    }
  });
}

function pip_freeze() {
  startServer();
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

function loading() {
  document.getElementById("loadingContainer").style.display = "block";
}

function pip_install() {
  loading();
  console.log(searchPackage);
  let command = pipPrefix + " install " + searchPackage;
  const exec = require("child_process").exec;
  exec(command, (err, stdout, stderr) => {
    console.log("\nstdout for iur: \n" + stdout);
    console.log("\nstderr for iur: \n" + stderr);
    if (err !== null) {
      console.log("\nexec error for iur: \n" + err);
    }
    if (stderr) {
      alert(stderr);
      pip_freeze();
    }
    if (stdout) {
      setTimeout(
        (document.getElementById("loadingContainer").style.display = "none"),
        2000
      );
      pip_freeze();
    }
  });
  document.getElementById("smenu").className = "hide";
}

function pip_uninstall() {
  loading();
  console.log(package);
  let command = pipPrefix + " uninstall " + package + " -y";
  const exec1 = require("child_process").exec;
  exec1(command, (err, stdout, stderr) => {
    console.log("\nstdout for iur: \n" + stdout);
    console.log("\nstderr for iur: \n" + stderr);
    if (err !== null) {
      console.log("\nexec error for iur: \n" + err);
    }
    if (stderr) {
      alert(stderr);
      pip_freeze();
    }
    if (stdout) {
      setTimeout(
        (document.getElementById("loadingContainer").style.display = "none"),
        2000
      );
      pip_freeze();
    }
  });
  document.getElementById("rmenu").className = "hide";
  document.getElementById("smenu").className = "hide";
}

function pip_upgrade() {
  loading();
  console.log(package);
  let command = "pip install " + package + " --upgrade";
  const exec2 = require("child_process").exec;
  exec2(command, (err, stdout, stderr) => {
    console.log("\nstdout for iur: \n" + stdout);
    console.log("\nstderr for iur: \n" + stderr);
    if (err !== null) {
      console.log("\nexec error for iur: \n" + err);
    }
    if (stderr) {
      alert(stderr);
      pip_freeze();
    }
    if (stdout) {
      setTimeout(
        (document.getElementById("loadingContainer").style.display = "none"),
        2000
      );
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
    if (stderr) {
      alert(stderr);
      pip_freeze();
    } else if (stdout) {
      alert(stdout);
      pip_freeze();
    }
  });
}

function pip_use_req(path) {
  const exec = require("child_process").exec;
  const cmd = "pip install -r " + path;
  exec(cmd, (err, stdout, stderr) => {
    console.log("\nstdout for use req: \n" + stdout);
    console.log("\nstderr for use req: \n" + stderr);
    if (err !== null) {
      console.log("\nexec error for use req: \n" + err);
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
      console.log(responseData);
      const packageContainer = document.getElementById("packageContainer");
      const searchReplace = document.getElementById("searchReplace");
      const list = document.getElementById("searchContainer");
      for (var i = 0; i < responseData.length; i++) {
        var item = document.createElement("p");
        item.appendChild(document.createTextNode(responseData[i]));
        list.appendChild(item);
        item.addEventListener("click", function (e) {
          packageTitle = e.srcElement.innerHTML;
          fetch(`http://localhost:5000/package_info?pkg_name=${packageTitle}`)
            .then((response) => {
              return response.json();
            })
            .then((res) => {
              document.getElementById("packageDescText").innerText =
                res.summary;
              document.getElementById("packagePythonVersionText").innerText =
                res.requires_python;
              document.getElementById("packageVersionText").innerText =
                res.version;
            });
          packageContainer.innerHTML = "";
          packageContainer.appendChild(searchReplace);
          searchReplace.style.display = "block";
          document.getElementById("packageTitle").innerText = packageTitle;
        });
      }
    });
}
function pip_install_from_panel() {
  loading();
  let command = pipPrefix + " install " + packageTitle;
  const exec = require("child_process").exec;
  exec(command, (err, stdout, stderr) => {
    console.log("\nstdout for iur: \n" + stdout);
    console.log("\nstderr for iur: \n" + stderr);
    if (err !== null) {
      console.log("\nexec error for iur: \n" + err);
    }
    if (stderr) {
      alert(stderr);
      pip_freeze();
    }
    if (stdout) {
      setTimeout(
        (document.getElementById("loadingContainer").style.display = "none"),
        2000
      );
      pip_freeze();
    }
  });
  document.getElementById("smenu").className = "hide";
}
function closePackageDetails() {
  document.getElementById("searchReplace").style.display = "none";
  pip_freeze();
}

function triggerRequirement() {
  document.getElementById("req-file-input").click();
}
