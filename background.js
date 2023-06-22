chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "makeRequest") {
    var params = new URLSearchParams();
    params.append('len', request.len);
    params.append('lower', request.lower);
    params.append('upper', request.upper);
    params.append('digit', request.digit);
    params.append('special', request.special);
    params.append('bracket', request.bracket);
    params.append('punctuation', request.punctuation);

    fetch(request.url, {
      method: 'POST',
      body: params
    })
      .then(response => response.text())
      .then(data => sendResponse(data))
      .catch(error => sendResponse(error));
    return true; // Indicates that sendResponse will be called asynchronously
  }
});
