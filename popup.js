document.addEventListener("DOMContentLoaded", function(e1) {
  var event1 = e1 || window.event;
  var requestButton = document.getElementById("requestButton");
  var resultContainer = document.getElementById("resultContainer");

  requestButton.addEventListener("click", function(e2) {
    var event2 = e2 || window.event;
    event2.preventDefault();

	  var lenInput = document.getElementById("len");
    var lowerInput = document.getElementById("lower");
    var upperInput = document.getElementById("upper");
    var digitInput = document.getElementById("digit");
    var specialInput = document.getElementById("special");
    var bracketInput = document.getElementById("bracket");
    var punctuationInput = document.getElementById("punctuation");
	
    var params = {
      action: "makeRequest",
      url: "https://rndpwd.info",
      len: lenInput.value,
      lower: lowerInput.checked,
      upper: upperInput.checked,
      digit: digitInput.checked,
      special: specialInput.checked,
      bracket: bracketInput.checked,
      punctuation: punctuationInput.checked
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
