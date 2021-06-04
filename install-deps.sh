#!/bin/sh

echo "Start installing dependencies for shared package...";
cd ./shared;
npm install;
echo "...Done installing dependencies for shared package";

echo "Start installing dependencies for ng-fe-pomodoro package...";
cd ../ng-fe-pomodoro;
npm install;
echo "...Done installing dependencies for ng-fe-pomodoro package";

echo "Start installing dependencies for main-preload package...";
cd ../main-preload;
npm install;
echo "...Done installing dependencies for main-preload package";

echo "Start installing dependencies for e2e-ui package...";
cd ../e2e-ui;
npm install;
echo "...Done installing dependencies for e2e-ui package";

echo "Start installing dependencies for e2e-electron package...";
cd ../e2e-electron;
npm install;
echo "...Done installing dependencies for e2e-electron package";