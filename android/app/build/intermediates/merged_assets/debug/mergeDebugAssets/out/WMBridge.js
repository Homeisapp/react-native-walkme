if (!window.onerror) {
  window.onerror = function(msg, url, line) {
    wmLog("_walkmeNativeBridge: ERROR:" + msg + "@" + url + ":" + line);
  }
};

window._walkmeNativeBridge = {
  callHandler: callHandler,
  getElemVisibilityState: getElemVisibilityState,
  isElementVisibleInViewport: isElementVisibleInViewport,
  logEnabled: false,
  _player : {
    _findElement : _findElement,
    _feResults : {},
    _segElements : {}
  },
  _capture : {
    _captureElement : _captureElement,
    _clickListener : null
  },
  portForNativeInterface: null
};

window.onmessage = function (e) {
  var portForNativeInterface = e.ports[0];
  if (portForNativeInterface && e.data === "_WM") {
    window._walkmeNativeBridge.portForNativeInterface = portForNativeInterface;
  }
};

function callHandler(handlerName, data) {
  var parsedData = data;
  if (data instanceof Object) {
    parsedData = JSON.stringify(data);
  }
  wmLog(handlerName + ' called with data: ' + parsedData);

  var message = {
    handler: handlerName,
    data: parsedData
  };

  if (window._walkmeNativeBridge.portForNativeInterface) {
      window._walkmeNativeBridge.portForNativeInterface.postMessage(JSON.stringify(message));
  }
  else if (window.WMJsBridgeInterface != null) {
      window.WMJsBridgeInterface[handlerName](parsedData);
  }
};

function findElement(data) {
  var elemDesc = JSON.parse(data.elemDesc);
  var elemKey = data.elemKey;

  // Invoke FE
  var domElem = _findElement(elemDesc);
  if (!domElem) {
    wmLog('findElement failed for element with key:' + elemKey);
    return null;
  }

  // Save FE result
  wmLog('findElement success for element with key:' + elemKey);
  var feResult = {};
  feResult.domElem = domElem;

  // Save FE result in segmentation / WT lists
  if (data.usedForSegmentation) {
      window._walkmeNativeBridge._player._segElements[elemKey] = feResult;
  }
  else {
      window._walkmeNativeBridge._player._feResults[elemKey] = feResult;
  }

  var elemVisibility = getElemVisibilityState(domElem);
  if (!data.usedForSegmentation && elemVisibility === 0 &&
    (data.hasOwnProperty("scrollAllowed") == false || data.scrollAllowed)) {
    // try scroll to bottom
    domElem.scrollIntoView(false);
    elemVisibility = getElemVisibilityState(domElem);
  }

  var domElemRect = domElem.getBoundingClientRect();
  var domElemRectString = '{{'+domElemRect.left+','+domElemRect.top+'},{'+domElemRect.width+','+domElemRect.height+'}}';
  var elemProps = getWmmProps(domElem);
  var elemDisabled = domElem.disabled;

  var element = {
    elemFrame: domElemRectString,
    elemProps: elemProps,
    isDisabled: elemDisabled,
    visibleState: elemVisibility,
    elemDesc: data.elemDesc,
    elemKey: data.elemKey
  }

  var scrollParentElement = getScrollParent(domElem);
  if (scrollParentElement && scrollParentElement != domElem) {
    var scrollParentRect = scrollParentElement.getBoundingClientRect();
    var scrollParentRectString = '{{'+scrollParentRect.left+','+scrollParentRect.top+'},{'+scrollParentRect.width+','+scrollParentRect.height+'}}';
    element.scrollParentRect = scrollParentRectString;
  }

  return element;
};

function parentElementDescriptionForLastCapturedElement(data) {
    if (!window._walkmeNativeBridge._capture._lastCaptured) {
        return null;
    }

    var element = window._walkmeNativeBridge._capture._lastCaptured.parentNode; // get parent node of element
    window._walkmeNativeBridge._capture._lastCaptured = element;
    var result = _captureElement(element);
    // top level element
    if (element.nodeName.toUpperCase() === "BODY") {
      result.hasParent = false;
    } else {
      result.hasParent = true;
    }

    return result;
}

function _findElement(elementDescriptionJSON) {
  var jQueryResult = window._walkmeInternals.ElementFinder.findElement(elementDescriptionJSON);
  var domElem = jQueryResult[0];
  return domElem;
};

function getScrollParent(element, includeHidden) {
  var style = getComputedStyle(element);
  var excludeStaticParent = style.position === "absolute";
  var overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/;

  if (style.position === "fixed") return document.body;
  for (var parent = element; (parent = parent.parentElement);) {
    style = getComputedStyle(parent);
    if (excludeStaticParent && style.position === "static") {
      continue;
    }
    if (overflowRegex.test(style.overflow + style.overflowY + style.overflowX)) return parent;
  }

  return element;
};

function trackElement(data) {
  var elemData = window._walkmeNativeBridge._player._feResults[data.elemKey];
  if (!elemData) {
    return false;
  }
  wmLog('trackElement called for element with key: ' + data.elemKey);

  elemData.domElem.addEventListener('click', function(){
    callHandler('onTrackElementClicked', data);
  });

  // track element focusOut
  elemData.domElem.addEventListener('focusout',function(event) {
    callHandler('onTrackElementFocusOut', data);
  });

  elemData.domElem.addEventListener('keyup',function(event) {
    if (event.keyCode === 13) {
        callHandler('onTrackElementEditorAction',data);
    }
  });

  if (getElemVisibilityState(elemData.domElem) === 0) {
    // try scroll to bottom
    elemData.domElem.scrollIntoView(false);
    // elemVisibility = getElemVisibilityState(elemData.domElem);
    // if (getElemVisibilityState(elemData.domElem) === 0) {
    //   // re-try scroll to center
    //   elemData.domElem.scrollIntoView({behavior: "instant", block: "center"});
    //   elemVisibility = getElemVisibilityState(elemData.domElem);
    // }
  }

  // track element position & visibility changes
  var trackInterval = setInterval(function() {
    var domElemRect = elemData.domElem.getBoundingClientRect();
    var elemXPoint = domElemRect.left + domElemRect.width / 2;
    var elemYPoint = domElemRect.top + domElemRect.height / 2;
    var domElemAtPoint = _elementFromPoint(elemXPoint,elemYPoint);

    var visibleState = getElemVisibilityState(elemData.domElem);

    // If elements is not contained in document / doesn't exist
    if (elemData.visibleState != visibleState) {
      elemData.visibleState = visibleState;
      data.visibleState = visibleState;
      callHandler('onTrackElementChangedVisibility', data);
      return;
    }

    // Check element position change
    if (domElemRect.left != elemData.lastRect.left || domElemRect.top != elemData.lastRect.top || domElemRect.width != elemData.lastRect.width || domElemRect.height != elemData.lastRect.height) {
      var domElemRectString = '{{'+domElemRect.left+','+domElemRect.top+'},{'+domElemRect.width+','+domElemRect.height+'}}';

      var scrollParentElement = getScrollParent(elemData.domElem);
      if (scrollParentElement && scrollParentElement != elemData.domElem) {
        var scrollParentRect = scrollParentElement.getBoundingClientRect();
        var scrollParentRectString = '{{'+scrollParentRect.left+','+scrollParentRect.top+'},{'+scrollParentRect.width+','+scrollParentRect.height+'}}';
        callHandler('onTrackElementChangedFrame', {"elemFrame":domElemRectString,"elemKey":data.elemKey, "elemDesc":data.elemDesc, "scrollParentRect":scrollParentRectString});
      }
      else {
        callHandler('onTrackElementChangedFrame', {"elemFrame":domElemRectString,"elemKey":data.elemKey, "elemDesc":data.elemDesc});
      }
    }
    elemData.lastRect = domElemRect;
  }, 16);

  elemData.trackInterval = trackInterval;
  elemData.lastRect = elemData.domElem.getBoundingClientRect();
  window._walkmeNativeBridge._player._feResults[data.elemKey] = elemData;

  return true;
};

// untrackElement: call this function to stop tracking element movement on screen
// In Params: {"elemKey": <element key>}
// Out Params: {"result": <true/false>}
function untrackElement(data) {
    wmLog('untrackElement called for element with key: ' + data.elemKey);

    var elemData = window._walkmeNativeBridge._player._feResults[data.elemKey];
    if (!elemData) {
        return false;
    }

    wmLog('clearing interval: ' + elemData.trackInterval);
    clearInterval(elemData.trackInterval);
    delete window._walkmeNativeBridge._player._feResults[data.elemKey];
    return true;
};

function isElementVisibleInViewport (elem, isFullyVisible) {
    var rect = elem.getBoundingClientRect();
    var scrollParentElem = getScrollParent(elem);

    if (scrollParentElem && scrollParentElem != elem) {
        // Element is inside a scrollable element
        // Check if the scroll element is aslo in viewport
        var isScrollParentInViewport = isElementVisibleInViewport(scrollParentElem);
        if (isScrollParentInViewport) {
            var scrollParentRect = scrollParentElem.getBoundingClientRect();
            if (isFullyVisible) {
                return (rect.top >= scrollParentRect.top &&
                        rect.left >= scrollParentRect.left &&
                        rect.bottom <= scrollParentRect.bottom &&
                        rect.right <= scrollParentRect.right);
            }

            // Accept partial visibility
            return !(rect.bottom < scrollParentRect.top ||
                    rect.top > scrollParentRect.bottom ||
                    rect.left > scrollParentRect.right ||
                    rect.right < scrollParentRect.left);
        }
        return false;
    }
    if (isFullyVisible) {
        return (rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth));
    }
    // Accept partial visibility
    return !(rect.bottom < 0 ||
             rect.top > (window.innerHeight || document.documentElement.clientHeight) ||
             rect.left > (window.innerWidth || document.documentElement.clientWidth) ||
             rect.right < 0);
};

function getElemVisibilityState(domElem) {
    if (!domElem || !document.contains(domElem))
        return -1;

    var domElemRect = domElem.getBoundingClientRect();
    if (domElemRect.width == 0 && domElemRect.height == 0)
        return -1;

    // Check 2 reference points (top center, bottom center) to determine element visibility
    var elemXPoint = domElemRect.left + domElemRect.width / 2;
    var elemYPoint = domElemRect.top + 1;
    var domElemAtPoint = _elementFromPoint(elemXPoint,elemYPoint);
    if (isDescendant(domElem,domElemAtPoint)) {
        return 1;
    }

    elemYPoint = domElemRect.bottom - 1;
    domElemAtPoint = _elementFromPoint(elemXPoint,elemYPoint);
    if (isDescendant(domElem,domElemAtPoint)) {
        return 1;
    }

    // element may be hidden not as a scroll result, but because its scroll parent is
    // covered by another element, in that case we consider the element as "broken" (=-1)
    var domElemScrollParent = getScrollParent(domElem);
    if (domElem !== domElemScrollParent &&
        getElemVisibilityState(domElemScrollParent) !== 1) {
        return -1;
    }

    return 0;
}

function isDescendant(parent, child) {
    var node = child;
    while (node != null) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
};

function captureClicks(enable) {
  if (enable) {
    if (window._walkmeNativeBridge._clickListener == null) {
      window._walkmeNativeBridge._clickListener = function(event) {
        var element = event.target;
        if (element != null) {
          var rect = element.getBoundingClientRect();
          // window._walkmeNativeBridge._capture._lastCaptured = element;
          var result = _captureElement(element);
          return callHandler('onElementClicked', result);
        }
      };
      window.addEventListener('click', window._walkmeNativeBridge._clickListener);
    }
  } else {
    window.removeEventListener('click', window._walkmeNativeBridge._clickListener);
    window._walkmeNativeBridge._clickListener = null;
  }
}
// Register player handlers
function enableTimers(isEnabled) {
    if (!isEnabled && window._walkmeNativeBridge.trackingTimer) {
        wmLog('enableTimers: stop timer');
        clearInterval(window._walkmeNativeBridge.trackingTimer);
        delete window._walkmeNativeBridge.trackingTimer;
        delete window._walkmeNativeBridge.latestScreenID;
        return true;
    }

    if (isEnabled && !window._walkmeNativeBridge.trackingTimer) {
        wmLog('enableTimers: start timer');

        // Start tracking timer
        window._walkmeNativeBridge.trackingTimer = setInterval(function() {
            // Calculate current screen ID
            var screenID = _getScreenID();
            if (screenID && window._walkmeNativeBridge.latestScreenID != screenID) {
                wmLog('enableTimers: sending onScreenChange for screenID ' + screenID);
                callHandler('onScreenChange',screenID);
                window._walkmeNativeBridge.latestScreenID = screenID;
            }

            // Iterate all elements used in current screen segmentations and check thier visibility
            var elementsChangedVisibility = {};
            for (var key in window._walkmeNativeBridge._player._segElements) {
                var currElem = window._walkmeNativeBridge._player._segElements[key];

                if (currElem.isTrackedForClick == null || !currElem.isTrackedForClick) {
                    currElem.isTrackedForClick = true;
                    currElem.domElem.addEventListener('click', function (key){
                        return callHandler('onScreenElementClicked', key);
                    }.bind(this, key));

                    wmLog("Start track for click on element " + key);
                }

                var visibleState = getElemVisibilityState(currElem.domElem);

                // If elements is not contained in document / doesn't exist
                if (visibleState == -1) {
                    elementsChangedVisibility[key] = visibleState;
                    delete window._walkmeNativeBridge._player._segElements[key];
                    continue;
                }

                if (visibleState != currElem.visibleState) {
                    currElem.visibleState = visibleState;
                    elementsChangedVisibility[key] = visibleState;
                }
            }

            if (Object.keys(elementsChangedVisibility).length != 0) {
                //wmLog("Elements that changed visibility: " + elementsChangedVisibility);
                callHandler('onScreenElementsChangedVisibility',elementsChangedVisibility);
            }

        },1000);
        return true;
    }
};

// elementDescriptionForTouch: call this function to get WalkMe web element description and props from a given {x,y}
// In Params: {x,y}
// Out Params: {"elemDesc": <WalkMe web element description>, "elemProps": <element property bag {type,label}>, "elemFrame" <element frame> }
function elementDescriptionForTouch(touch) {
  var element = _elementFromPoint(touch.x, touch.y);
  var rect = element.getBoundingClientRect();
  while (rect.width < 30 && rect.height < 30 && element != null) {
    element = element.parentElement;
    rect = element.getBoundingClientRect();
  }

  window._walkmeNativeBridge._capture._lastCaptured = element;
  var result = _captureElement(element);
  return result;
};

function _elementFromPoint(x,y) {
  var el = document.elementFromPoint(x, y);
  if (el instanceof HTMLIFrameElement)
  return el.contentWindow.document.elementFromPoint(x, y);
  return el;
};

function _captureElement(element) {
  var elemProps = getWmmProps(element);
  var elemDesc = window._walkmeInternals.elementDescriptionGenerator.generateIdentifySettings(element);
  var domElemRect = element.getBoundingClientRect();
  var domElemRectString = '{{'+domElemRect.left+','+domElemRect.top+'},{'+domElemRect.width+','+domElemRect.height+'}}';
  return {"elemDesc":elemDesc,"elemFrame":domElemRectString,"elemProps":elemProps};
};

function _getScreenID() {
  if (window._walkmeAppPlugin && window._walkmeAppPlugin.screenID) {
    return window._walkmeAppPlugin.screenID;
  }
  return document.URL;
};

function loadAppData(keys) {
  if (window._walkmeAppPlugin && window._walkmeAppPlugin.loadAppData) {
    window._walkmeAppPlugin.loadAppData(keys, function(result) {
      callHandler('onAppDataLoaded', result);
    });
    return true;
  }

  return false;
};

function wmLog(message) {
  if (window._walkmeNativeBridge.logEnabled) {
    console.log(message);
  }
};

function getElementFrame(elemKey) {
  var elemData = window._walkmeNativeBridge._player._feResults[elemKey];
  if (!elemData) {
    return null;
  }

  var domElemRect = elemData.domElem.getBoundingClientRect();
  return '{{'+domElemRect.left+','+domElemRect.top+'},{'+domElemRect.width+','+domElemRect.height+'}}';
}

function isBridgeLoaded() {
  return document.readyState === 'complete' && window._walkmeNativeBridge != null && window._walkmeInternals != null;
};

function killBridge() {
  enableTimers(false);
  window._walkmeNativeBridge = null;

  wmLog("_walkmeNativeBridge killed!");
  return true;
};
