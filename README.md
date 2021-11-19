# RateMyRestroom MapView
506 Spike Project

Please run "npm install" after cloning the github repo to install the correct packages
Expo-cli also must be installed prior to running the code.

In the canvas submission there will be a "keys.js" file. Place this file in the "config" folder in the "RateMyRestroom" main folder. This will give the user the proper api keys to run the application.

"npm test to" test
If the snapshot test results come as 'obsolete' (meaning an older or depracated snapshot is being used), use the command "npm test -- -u" to remove the obsolete snapshot. This issue only arises when stale snapshots are tested against newer code, and the obsolete issue will not appear again after using the previous command. Then one can use "npm test" once more.

"npm run summary" to run code coverage test, and get the summary. This also creates a coverage-final.json file in the "coverage" folder.

In order to view the app on the iPhone, one must download the Expo Go application. Once the application is running, and you run the start command, the application will create a localhost for the react native application. From the command line, a QR code will be presented. If one has the expo-app installed this will take them to the app and show the Rate My Restroom application in development. The application will then be accessible from the 'recently opened' list in Expo Go.



