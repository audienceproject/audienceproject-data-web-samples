!function(e,t){"function"==typeof define&&define.amd?define("AudienceProjectData",["exports"],t):"undefined"!=typeof exports?t(exports):(t(t={}),e.AudienceProjectData=t)}("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:this,function(e){"use strict";function P(){return(P=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n,o=arguments[t];for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e}).apply(this,arguments)}e.__esModule=!0,e.utils=e.packageVersion=e.packageName=e.moduleName=e.fetchStatus=e.fetchStateRunning=e.fetchStateReady=e.fetchStateInitial=e.fetchStateFailed=e.fetchCache=e.fetch=e.default=void 0;var C="AudienceProjectData";e.moduleName=C;var T="@audienceproject/data-web";e.packageName=T;var R="1.3.0";e.packageVersion=R;var N={};e.fetchCache=N;var t="INITIAL";e.fetchStateInitial=t;var E="RUNNING";e.fetchStateRunning=E;var O="READY";e.fetchStateReady=O;var _="FAILED";e.fetchStateFailed=_;var D={state:t};e.fetchStatus=D;function n(a,e,t){if("string"!=typeof a||!a)throw new Error("Invalid customer ID");var n,o,u=P({allowStorageAccess:!0,allowPersonalisation:!0,gdprApplies:null,consentString:"",integrateWithCmp:!1,waitForCmpConsent:!1,requestParams:{},timeout:1e3,addStatusKey:!1,cacheType:"",cacheKey:"url,allowPersonalisation,requestParams",cacheTime:86400,requestDomains:{regular:"pdw-usr.userreport.com",nonPersonalised:"dnt-userreport.com"},debug:!1},e,(o="__audienceProjectDataFetchOptions=",window.location.search.split(/[?&]/).some(function(e){var t=0===e.indexOf(o);if(t){e=e.slice(o.length);try{n=JSON.parse(decodeURIComponent(e))}catch(e){}}return t}),n)),l=function(){for(var e,t=arguments.length,n=new Array(t),o=0;o<t;o++)n[o]=arguments[o];return u.debug&&(null==(e=console)?void 0:e.log.apply(e,["["+C+"]"].concat(n)))};function r(e){try{return JSON.parse(e)}catch(e){return}}function d(e,t){l("Reading prediction from API…");var i=["med",window.location.href];document.referrer&&i.push("ref",document.referrer);var n=m(h);n&&i.push("sref",n),!u.allowPersonalisation||(n=m(c))&&i.push("dsu",n),"boolean"==typeof u.gdprApplies&&i.push("gdpr",Number(u.gdprApplies)),u.consentString&&i.push("gdpr_consent",u.consentString),i.push("appid",T+":"+R),function o(a,r){Object.keys(a).forEach(function(e){var t,n=a[e];void 0!==n&&(t=r+e,"[object Array]"===Object.prototype.toString.call(n)?n.forEach(function(e){i.push(t,e)}):"object"==typeof n?o(n,t+"_"):i.push(t,n))})}(u.requestParams,"");var o="https://"+(u.allowPersonalisation?u.requestDomains.regular:u.requestDomains.nonPersonalised)+"/api/v2/partner/"+encodeURIComponent(a)+"/uid";return i.forEach(function(e,t){o+=(t%2?"=":t?"&":"?")+encodeURIComponent(e)}),s(o,e,t)}l("Fetch called…"),l("Version:",R),l("Customer ID:",a),l("Customer options:",e),l("Fetch options:",u);var f,p=function(){return function(e){for(var t=0,n=e.length,o=0;o<n;o+=1)t=(t<<5)-t+e.charCodeAt(o),t&=t;return t}(u.cacheKey.split(/\s*,\s*/).sort().map(function(e){if("url"===e)return window.location.pathname.slice(1)+window.location.search;if("allowPersonalisation"===e)return u.allowPersonalisation?"":0;if("requestParams"!==e)return"";e=JSON.stringify(u.requestParams);return"{}"===e?"":e}).join(""))},i=localStorage,h="apr_sref",g="apr_data_cache",c="apr_dsu",m=function(e){if(u.allowStorageAccess){var t;try{t=i[e]}catch(e){}return t&&0===t.indexOf("{")&&t.lastIndexOf("}")===t.length-1?r(t):t}},v=function(e,t){if(u.allowStorageAccess){t="object"==typeof t?JSON.stringify(t):t;try{i[e]=t}catch(e){}}},w=Math.round((new Date).getTime()/1e3),y=function(){return"localStorage"!==u.cacheType||function(){if(!u.allowStorageAccess)return!1;var e="apr_check_access@"+Math.random();try{i[e]=e;var t=i[e]===e;return delete i[e],t}catch(e){}return!1}()?u.cacheType:"memory"},S=new XMLHttpRequest,s=function(e,t,n){l("API request:",e),S.onreadystatechange=function(){var e;S.readyState===XMLHttpRequest.DONE&&(200===S.status?(e=r(S.responseText),l("API response:",e),t(e)):(l("API failed with code:",S.status),n()))},S.open("GET",e,!0),S.withCredentials=u.allowPersonalisation,S.send()},A=[];return"function"==typeof t&&A.push(t),function(){var r;D.state=E,delete D.result,delete D.options;function i(e,t){var n,o,a;s||(s=!0,n=e,o=t.code,u.addStatusKey&&(l("Updating status fields…"),n.keyValues=n.keyValues||{},n.keyValues.ap_ds=String(o)),a=P({type:t.value},e),D.state=0<t.code?O:_,D.result=a,D.options=u,function(e){clearTimeout(e);e=(new Date).getTime()-f;l("Timeout ended:",e,"ms")}(r),S.abort(),l("Callback result:",a),A.forEach(function(e){e(a)}))}var n,c,o,a,t,s=!1;n=function(){var e,t={value:"TIMEOUT",code:-2},n={value:"BACKEND_ERROR",code:-1},a=u.allowPersonalisation?{value:"RETURNED",code:1}:{value:"RETURNED_ANONYMOUS",code:"1a"},o=u.allowPersonalisation?{value:"RETURNED_FROM_CACHE",code:2}:{value:"RETURNED_ANONYMOUS_FROM_CACHE",code:"2a"};return r=function(e){if(u.timeout)return l("Timeout started…"),f=(new Date).getTime(),setTimeout(e,u.timeout)}(function(){i({},t)}),u.allowPersonalisation&&(l("Checking session referrer…"),e=window.location.protocol+"//"+window.location.host+"/",document.referrer&&0!==document.referrer.indexOf(e)&&(l("Session referrer updated:",document.referrer),v(h,document.referrer))),function(e,t){var n,o=y();if(!o)return t();l("Reading prediction from cache…");var a=p();return"localStorage"===o?(l("Reading prediction from local storage key:",a),n=m(g)):"memory"===o&&(l("Reading prediction from memory key:",a),n=N[a]),"object"!=typeof n?t():n.ttl+u.cacheTime<w||n.hash!==a?(l("Cached prediction expired…"),t()):(l("Cached prediction:",n.data),e(n.data))}(function(e){i(e,o)},function(){return d(function(e){var t,n,o;t=e,(o=y())&&(l("Saving prediction to cache…"),n=p(),t={data:t,ttl:w,hash:n},"localStorage"===o?v(g,t):"memory"===o&&(N[n]=t)),i(e,a)},function(){i({},n)})})},u.integrateWithCmp?(l("Checking CMP…"),"function"==typeof __tcfapi?(l("Using TCF 2.0 API…"),c=394,o=function(e){var t,n,o,a;u.gdprApplies=Boolean(e.gdprApplies),u.consentString=e.tcString||"",u.gdprApplies&&(a=null==(a=e.vendor)||null==(t=a.consents)?void 0:t[c],u.allowStorageAccess=Boolean(a&&(null==(t=e.purpose)||null==(n=t.consents)?void 0:n[1])),u.allowPersonalisation=Boolean(a&&(null==(e=e.purpose)||null==(o=e.consents)?void 0:o[3]))),l("Options after CMP override:",u)},t=function e(t){"tcloaded"!==t.eventStatus&&"useractioncomplete"!==t.eventStatus||(a("removeEventListener",e),o(t),n())},(a=function(e,o){__tcfapi(e,2,function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];l.apply(void 0,["TCF response:"].concat(t)),o.apply(void 0,t)},[c])})("getTCData",function(e){if(!u.waitForCmpConsent||!e.gdprApplies||"tcloaded"===e.eventStatus||"useractioncomplete"===e.eventStatus)return o(e),void n();l("Adding TCF consent listener…"),a("addEventListener",t)})):l("No TCF 2.0 API found…")):n()}(),{promise:function(){return new Promise(function(e){l("Promise called…"),A.push(e)})}}}e.fetch=n;var o={sendDataToGooglePublisherTag:function(t){window.googletag=window.googletag||{cmd:[]};function e(){Object.keys(t.keyValues).forEach(function(e){window.googletag.pubads().setTargeting(e,t.keyValues[e])})}window.googletag.cmd.unshift?window.googletag.cmd.unshift(e):window.googletag.cmd.push(e)}};e.utils=o;o={moduleName:C,packageName:T,packageVersion:R,fetchCache:N,fetchStateInitial:t,fetchStateRunning:E,fetchStateReady:O,fetchStateFailed:_,fetchStatus:D,fetch:n,utils:o};e.default=o});


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
    window.googletag = window.googletag || {};
    googletag.cmd = googletag.cmd || [];

    //TODO: add init
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
            // If value is scalar, we convert to array for consistency. Then value is always array of 1+ values
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
function addKeyValuesToAdformBidders(adformBidders, keyValues) {
    var kvString = getAdformKeyValuesString(keyValues);

    if (!kvString) return;


    var pbjs = pbjs || {};
    pbjs.que = pbjs.que || [];
    pbjs.que.push(function() {   
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
    });
}


/**
 * Process Prediction results, handling is publisher specific based on goals
 * @example <caption>Example input to function</caption>
 * {
    "type": "RETURNED",
    "ap": {
        "segments": [
        "1100",
        "1404",
        "1409",
        "1408",
        "1407",
        "1405",
        ]
    },
    "keyValues": {
        "ap_emp": "2",
        "ap_chi": "0",
        "ap_hhs": "1",
        "ap_inc": "2",
        "ap_gen": "0",
        "ap_stda": "5",
        "ap_edu": "2"
    }
    }
 */
function onAudienceProjectDataAvailable(dataResponse) {
   
    // in keyValues there are full-reach key-values created, they needs to be sent to GAM and added to Prebid adform ad-units
    if (dataResponse.keyValues) {
        addKeyValuesToGPT(dataResponse.keyValues);
        addKeyValuesToAdformBidders(adformBidders, dataResponse.keyValues);
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
    timeout: 1000,
};

// List of Adform bidders to add key-values to
var adformBidders = ["adform"];
var customerId = "test";

AudienceProjectData.fetch(customerId, apDataRequestOptions, onAudienceProjectDataAvailable);
