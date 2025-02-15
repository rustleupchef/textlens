browser.runtime.onMessage.addListener((message, sender) => {
  if (message.type === "FIND") {
    // Forward the message to the content script
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      if (tabs[0]) {
        browser.tabs.sendMessage(tabs[0].id, { type: "FROM_POPUP", data: message.data });
      }
    });
  }

  if (message.type === "MOVE") {
    // Forward the message to the content script
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      if (tabs[0]) {
        browser.tabs.sendMessage(tabs[0].id, { type: "MOVE_TO", data: message.data });
      }
    });
  }

  if (message.type === "CLOSE") {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      if (tabs[0]) {
        browser.tabs.sendMessage(tabs[0].id, { type: "UNHIGHLIGHT"});
      }
    });
  }
});