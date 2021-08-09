# Adform SSP (PB 4.x), GAM and CDP

In this example, AudienceProject Data is added to Adform SSP connected through prebid (before 5.x), sent to Google Ad Manager and abstract CDP.

See `ad-tech.js` for details. `onAudienceProjectDataAvailable` is the place where data integration happens. 

We created this example assuming that it is possible to call `AudienceProjectData.fetch` with delay (up to 500ms) before bids are factually requested. The following factors can cause such delay:
* Use of async first-party data providers
* Use of ID-management system
* How ad-tech scripts are structured

**Warning** Adform SSP in before 4.x uses GET request for the bids that are limited of size (8Kb). Key-values are added for each placement! Given that all placements are combined in a single request, this limit could be relatively easy to break. So, you need to keep an eye on the ad-units count and how many key-values in total are added. Consider migrating to PB5 that works with `POST` and has no such limitation.

# Troublshooting

## How to check if key-values are sent to Google Ad Manager?

1. Debug creative prints all key-values sent with ad-request
1. You can open GAM's debug console by running `googletag.openConsole()` in Developers Tools -> Console and look for "Set targeting attribute ap_..." strings in **Page Request** tab

## How to check if key-values sent to Adform SSP
1. Open a browser and activate the Developer console so that you can see Network requests
1. Open `index.html`, give consent if prompted
1. In developers tools, find ad-request to Adform SSP by looking for `https://adx.adform.net/adx/`. You should see two as Adform added twice (original and aliased)
1. Examine the request and scroll down to Query String Parameters section. You will find keys below `rp: 4` that look like long and scary strings
1. These strings are base64 encoded placement information. You need to copy one of these strings to base64 decode tool (e.g. https://www.base64decode.org/)
1. Decode the string. If you see `mkv` string and keys prefixed with `ap_`, it is safe to assume that integration is done correctly. Example:
```
Encoded: bWlkPTc3NzcwMyZta3Y9YXBfZ2VuOjAsYXBfaW5jOjIsYXBfY2hpOjAsYXBfc3RkYTowLGFwX2hoczozLGFwX2VtcDowLGFwX2VkdTo0JnRyYW5zYWN0aW9uSWQ9ZjgwNTg3MGYtNTIzYS00ODRmLWJjOWUtMTBiYzIyYTM0Mzdm
Decoded: mid=777703&mkv=ap_gen:0,ap_inc:2,ap_chi:0,ap_stda:0,ap_hhs:3,ap_emp:0,ap_edu:4&transactionId=f805870f-523a-484f-bc9e-10bc22a3437f
```