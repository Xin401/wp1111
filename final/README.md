step 1. cd client && yarn && yarn start
step 2. cd server && yarn && yarn server


(bug to be fix...)如果測試者遇到activities.map報錯的話，請測試者在 'client/src/scenes/widgets/ActivitiesWidget.jsx' 將54~95行的大括號註解後可以進入home，創建一個活動後再將註解拿掉，應該就可以正常使用了。