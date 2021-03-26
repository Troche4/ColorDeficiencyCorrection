// achromatomaly

if (document.getElementById("styleID612481")) {
    stylingID = document.getElementById("styleID612481").remove();
    filterID = document.getElementById("filterID471924").remove();
};
stylingID = document.createElement('style');
stylingID.id = "styleID612481";
document.body.appendChild(stylingID);

filterID = document.createElement('div');
filterID.id = "filterID471924";
filterID.setAttribute('style', 'height: 0; padding: 0; margin: 0; line-height: 0;');
document.body.appendChild(filterID);

filterID.innerHTML = '<svg id="colorblind-filters" style="display: none"> <defs> <filter id="achromatomaly"> <feColorMatrix type="matrix" values="1.84,-0.703,-0.137,0,0 -0.358,1.495,-0.137,0,0 -0.358,-0.705,2.066,0,0 0,0,0,1,0" in="SourceGraphic" /> </filter> </defs> </svg>';
stylingID.innerHTML = 'html{-webkit-filter:url(#achromatomaly);-moz-filter:(#achromatomaly);-ms-filter:(#achromatomaly);-o-filter:(#achromatomaly);filter:(#achromatomaly);}'
