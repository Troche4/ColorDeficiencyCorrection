const makeCssStyles = type =>
  `#rainbow{-webkit-filter:url(#${type});-moz-filter:(#${type});-ms-filter:(#${type});-o-filter:(#${type});filter:(#${type});}`;
const makeSVGFilter = (type, filterValues) =>
  `<svg id="colorblind-filters" style="display: none"> <defs> <filter id="${type}"> <feColorMatrix type="matrix" values="${filterValues}" in="SourceGraphic" /> </filter> </defs> </svg>`;
const filters = {
  deuteranomalySVG: makeSVGFilter(
    "deuteranomaly",
    "0.8,0.2,0,0,0 0.258,0.742,0,0,0 0,0.142,0.858,0,0 0,0,0,1,0"
  ),
  deuteranomalyStyles: makeCssStyles("deuteranomaly"),

  protanomalySVG: makeSVGFilter(
    "protanomaly",
    "0.817,0.183,0,0,0 0.333,0.667,0,0,0 0,0.125,0.875,0,0 0,0,0,1,0"
  ),
  protanomalyStyles: makeCssStyles("protanomaly"),

  tritanomalySVG: makeSVGFilter(
    "tritanomaly",
    "0.967,0.033,0,0,0 0,0.733,0.267,0,0 0,0.183,0.817,0,0 0,0,0,1,0"
  ),
  tritanomalyStyles: makeCssStyles("tritanomaly")
};

function applyFilter(filter) {
  //function to apply filters
  if (filter === "trichromacy")
    return removeFilter({ target: { id: window.selectedFilter } });

  //clear any active filters
  if (
    document.getElementById("styleID") &&
    document.getElementById("filterID")
  ) {
    document.getElementById("styleID").remove();
    document.getElementById("filterID").remove();
  }
  stylingID = document.createElement("style");
  stylingID.id = "styleID";
  document.body.appendChild(stylingID);

  filterID = document.createElement("div");
  filterID.id = "filterID";
  filterID.setAttribute(
    "style",
    "height: 0; padding: 0; margin: 0; line-height: 0;"
  );
  document.body.appendChild(filterID);
  

  // get the SVG and styles from the filters object in the global scope
  filterID.innerHTML = filters[filter + "SVG"];
  stylingID.innerHTML = filters[filter + "Styles"];
  // scrollBy event to force an update to the dom, fixes an issue where the SVG filter does not apply until the screen changes
  setTimeout(function() {
    window.scrollBy(1, 1);
    window.scrollBy(-1, -1);
  }, 1);
}

//validates filter name
function selectFilter(evt) {
  if (!evt) return;

  const filter = getID(evt.target);
  if (!filter) return;
  applyFilter(filter);
}

function getID(element) {
  let filterID = element.id.replace("option-", "");
  return !!filterID ? filterID : getID(element.parentNode);
}

// remove the currently rendered filter from the popup
function removeFilter(evt) {
  if (!evt) return;

  const filter = getID(evt.target);
  if (!filter) return;

  stylingID = document.getElementById("styleID");
  filterID = document.getElementById("filterID");
  if (stylingID && filterID) {
    stylingID.remove();
    filterID.remove();
  }
}

// get all divs containing that match the querySelector pattern below
const options = document.querySelectorAll('[id^="option-"]');

// iterate through all of the divs containing the radio buttons and labels
options.forEach(option => {
  option.addEventListener("mouseover", selectFilter, false);
  option.addEventListener(
    "mouseout",
    evt => {
      removeFilter(evt);
      // re-apply the currently selected filter
      if (window.selectedFilter) applyFilter(window.selectedFilter);
    },
    false
  );
});
