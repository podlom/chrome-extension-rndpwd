function getCheckboxValue(checkboxId) {
  var checkbox = document.getElementById(checkboxId);
  if (checkbox && checkbox.type === "checkbox") {
    if (checkbox.checked) {
      return 1;
    }
  }
  return 0;
}

document.addEventListener("DOMContentLoaded", function() {
  var requestButton = document.getElementById("requestButton");
  var resultContainer = document.getElementById("resultContainer");

  requestButton.addEventListener("click", function(e2) {
    var event2 = e2 || window.event;
    event2.preventDefault();

	  var lenInput = document.getElementById("len");
	
    var params = {
      action: "makeRequest",
      url: "https://rndpwd.shkodenko.com",
      len: lenInput.value,
      lower: getCheckboxValue("lower"),
      upper: getCheckboxValue("upper"),
      digit: getCheckboxValue("digit"),
      special: getCheckboxValue("special"),
      bracket: getCheckboxValue("bracket"),
      punctuation: getCheckboxValue("punctuation")
    };

    chrome.runtime.sendMessage(params, function(response) {
      if (chrome.runtime.lastError) {
        resultContainer.textContent = "Error: " + chrome.runtime.lastError.message;
      } else {
		    var jsonResponse = JSON.parse(response);
		    resultContainer.textContent = jsonResponse.randomPassword;
		    /* resultContainer.resultMsg = jsonResponse.msg; */
      }

      var myH1 = document.getElementById("resultH1");
      myH1.classList.remove("ts-hidden");
      event2.stopPropagation();
    });
  });
});
