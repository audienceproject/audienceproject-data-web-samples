# Google AdManager

In this example, AudienceProject Data is sent to Google Ad Manager.

See `ad-tech.js` for details. `onAudienceProjectDataAvailable` is the place where data integration happens. 

We created this example assuming that it is possible to call `AudienceProjectData.fetch` as early as possible, so before GPT tag requests ads, the data is returned. In 99% of cases, 500ms is enough. 


# Troublshooting

## How to check if key-values are sent to Google Ad Manager?

1. Debug creative prints all key-values sent with ad-request
1. You can open GAM's debug console by running `googletag.openConsole()` in Developers Tools -> Console and look for "Set targeting attribute ap_..." strings in **Page Request** tab
