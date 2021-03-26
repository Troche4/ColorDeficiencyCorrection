//Runs a JavaScript file when a radio input element is clicked to apply the respective filter
window.selectedFilter = null;

//gets input value from form when page is loaded
window.onload = function() {
  if (!chrome || !chrome.storage || !chrome.storage.local) return;
  chrome.storage.local.get(["key"], function(result) {
    try {
      document.getElementById(result.key).click();
    } catch (e) {
      console.log(e);
    }
  });
};

//function to put value in local storage
function setSelected(value) {
  try {
    chrome.storage.local.set({ key: value }, function() {
      document.getElementById(value).checked = true;
    });
  } catch {}
}

//function to execute filtering script
function injectFilter(fileName) {
  chrome.tabs.executeScript({ file: fileName });
}

//add event listeners
document.querySelectorAll(['[id^="radio"]']).forEach(radioButton => {
  const filter = radioButton.parentElement.id.replace("option-", "");
  radioButton.addEventListener("click", function() {
    // page-specific filters
    setSelected(radioButton.id);
    injectFilter(`filters/${filter}.js`);
    // popup-specific filters
    applyFilter((window.selectedFilter = filter));
  });
});
