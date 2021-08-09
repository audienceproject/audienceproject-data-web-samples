//--------- AdienceProject utility functions ---------//
// The mapping is provided by AudienceProject and must not be modified
var AP_KV_MAPPING = {
    "a": [ 1100, 1101 ],
    "b": [ 1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023, 1024, 1025, 1026, 1027, 1028, 1029, 1030, 1031, 1032 ],
    "c": [ 1200, 1201, 1202, 1203, 1204, 1205, 1206 ],
    "d": [ 1301, 1300 ],
    "e": [ 1600, 1601, 1602, 1603, 1604, 1605, 1606, 1607, 1608, 1609, 1610, 1611, 1612, 1613, 1614, 1615, 1616, 1617 ],
    "f": [ 1500, 1501, 1502, 1503, 1504, 1505, 1506, 1507, 1508, 1509, 1510, 1511, 1512, 1513, 1514 ],
    "g": [ 1400, 1401, 1402, 1403, 1404, 1405, 1406, 1407, 1408, 1409, 1410, 1411, 1412, 1413, 1414, 1415, 1416, 1417, 1418 ]
};


/**
 * Convers list of AP segment ID to key-value map based on `AP_KV_MAPPING`. In result object keys are prefixed with `ap_`.
 * Segments that are not mapped explicitly are assigned to `ap_x` key.
 * @param {string[]} segments - List of segment ID returned by AudienceProject
 * @example 
 * // returns { "ap_a": ["1101"], "ap_x": "13245" }
 * convertAudienceProjectSegmentsToKeyValues(["1101", "13245"])
 * @returns {Object} Object that where fields are keys and value is array of segment IDs assigned to the key
 */
 function convertAudienceProjectSegmentsToKeyValues(segments) {
    
    var result = {};
    if (segments && segments.length) {
        var segMapping = {};
        for (var key in AP_KV_MAPPING) {
            AP_KV_MAPPING[key].forEach(function(segmentId){
                segMapping[segmentId] = key;
            });
        }

        for (var i = 0; i < segments.length; i++) {
            // Segment IDs should be converted to Strings for safety
            var segment = String(segments[i]);
            var key = segMapping[segment] || "x";
            key = "ap_" + key;
            if (!result[key]) {
                result[key] = [];
            }
            result[key].push(segment);
        }
    }

    return result;
}

/**
 * Adds key-values to page level of Google Publisher Tag
 * @example 
 * addKeyValuesToGPT({"ap_a": ["1100"], "ap_x": ["134123"]})
 * @param {Object} keyValues
 */
function addKeyValuesToGPT(keyValues) {
    if (!googletag.pubads) {
        googletag.cmd.push(function () {
            addKeyValuesToGPT(keyValues);
        });
        return;
    }
    for (const key in keyValues) {
        if (Object.hasOwnProperty.call(keyValues, key)) {
            const value = keyValues[key];
            googletag.pubads().setTargeting(key, value);
        }
    }
}


/**
 * Generates Key-values string that can be added to `mkv` param of Adform bidder
 * @param {Object} keyValues Key-values object, where value is scalar value of array of scalars
 * @example
 * // returns ap_a:1101,ap_b:1000,ap_b:1001
 * getAdformKeyValuesString({ "ap_a": ["1101"], "ap_b": ["1000", "1001"]})
 * @returns {string} Key-values string that can be added to mkv param of Adform bidder
 */
function getAdformKeyValuesString(keyValues) {
    var kvPairs = [];
    for (var key in (keyValues || {})) {
        if (Object.hasOwnProperty.call(keyValues, key)) {
            var values = keyValues[key];
            // Convert to array for consistency. Value is scalar or array, we need to adopt
            if (!Array.isArray(values)) {
                values = [values];
            }
            values.forEach(function(value){
                kvPairs.push(encodeURIComponent(key) + ":" + encodeURIComponent(value));
            })
        }
    }

    return kvPairs.join(",");
}
//--------- END: AdienceProject utility functions ---------//

//--------- AdienceProject data integration functions ---------//

/**
 * Adds key-values to Adform bidders before auction has started
 * @param {Object} keyValues Key-values to add
 */
function addKeyValuesToAdformBidders(keyValues) {
    var kvString = getAdformKeyValuesString(keyValues);
    console.log("kvString", kvString);

    if (!kvString) return;

    // List of Adform bidders to add key-values to
    var adformBidders = ["adform", "adform-aliased"];

    pbjs.adUnits.forEach(function(adUnit) {
        adUnit.bids.forEach(function(bidConfig) {
            // Skip non-Adform bidders
            if (adformBidders.indexOf(bidConfig.bidder) === -1) {
                return;
            }
            // Add key-values to the existing
            bidConfig.params.mkv = (bidConfig.params.mkv ? bidConfig.params.mkv + "," : "") + kvString;
        })
    });
}


/*
 * Process Prediction results, handling is publisher specific based on goals
 */
function onAudienceProjectDataAvailable(dataResponse) {
    // in keyValues there are full-reach key-values created, they needs to be sent to GAM and added to Prebid adform ad-units
    if (dataResponse.keyValues) {
        addKeyValuesToGPT(dataResponse.keyValues);
        addKeyValuesToAdformBidders(dataResponse.keyValues);
    }

    /*
    dataResponse.ap.segments consis list of ID-based segments user belongs to. They can be synced to 
    */
    if (dataResponse.ap && dataResponse.ap.segments) {
        var idBasedKVs = convertAudienceProjectSegmentsToKeyValues(dataResponse.ap.segments);
        addKeyValuesToGPT(idBasedKVs);
    }

    // Here you can send data to CDP using HTTP or JS API
}


//--------- END: AdienceProject data integration functions ---------//

//--------- Emulation of real ad-tech stack. Important points are commented ---------//
var PREBID_TIMEOUT = 3000;
var FAILSAFE_TIMEOUT = 3000;

var adUnits = [{
    code: '/171702534/site1/header-ad',
    mediaTypes: {
        banner: {
            sizes: [ [980, 120] ]
        }
    },
    bids: [{
        "bidder": "adform",
        "params": {
            "mid": "716771",
            "mkv": "test_key:test_value"
        }
    },{
        "bidder": "adform-aliased",
        "params": {
            "mid": "777703"
        }
    }]
}];

var pbjs = pbjs || {};
pbjs.que = pbjs.que || [];

pbjs.que.push(function () {
    pbjs.aliasBidder('adform', 'adform-aliased');

    pbjs.setConfig({
        enableSendAllBids: true,
        debug: false
    });

    pbjs.addAdUnits(adUnits);
});

function initAdserver() {
    if (pbjs.initAdserverSet) return;
    pbjs.initAdserverSet = true;
    googletag.cmd.push(function () {
        pbjs.setTargetingForGPTAsync && pbjs.setTargetingForGPTAsync();
        googletag.pubads().refresh();
    });
}

googletag.cmd.push(function () {
    googletag
        .defineSlot('/171702534/site1/header-ad', [980, 120], 'header-ad')
        .addService(googletag.pubads());

    googletag.pubads().enableSingleRequest();
    googletag.enableServices();
});


function initAdTechStack() {
    /*
     * In this example there are no delay between `AudienceProjectData.fetch` call and PB auction start.
     * In real-life cases, such delays are likely to happen due to multiple factors:
     *  - integration with other 3rd party services
     *  - integration with ID-systems
     * If such delay is present and is around 500ms, it is rather safe to expect `onAudienceProjectDataAvailable` will be called before bids requested.
     * In this example, we delay auction by 500ms to simulate delays mentioned above.
     * If assumption is falsy for the specific publisher, then auction initialisation should be moved to `onAudienceProjectDataAvailable`
     */
    setTimeout(function() {
        pbjs.requestBids({
            bidsBackHandler: function () {
                initAdserver();
            },
            timeout: PREBID_TIMEOUT
        });    
    }, 500);

    setTimeout(initAdserver, FAILSAFE_TIMEOUT);
}

// Run only when __tcfapi is availabe
(function start() {
    if (!window.__tcfapi) {
        setTimeout(start, 10);
        return;
    }

    /* 
     * Request data from AudienceProject. 
     * Make this call as early as possible during the page lifecycle, once __tcfapi is available
     * 
     * With the current settings, request for the data will not happen until consent choice is made.
     * Other options are possible, e.g. pass consent string directly, request anonymised if no consent etc.
     * See https://www.npmjs.com/package/@audienceproject/data-web for details
     */
    var apDataRequestOptions = {
        integrateWithCmp: true,
        waitForCmpConsent: true,
        timeout: 500,
    };
    AudienceProjectData.fetch("test", apDataRequestOptions, onAudienceProjectDataAvailable);

    // Hold back ad-tech stack initialisation until consent choise is made
    window.__tcfapi('addEventListener', 2, function (tcData, success) {
        if (success && tcData.tcString && !initAdTechStack.called) {
            initAdTechStack.called = true;
            initAdTechStack();
        }
    })
})();