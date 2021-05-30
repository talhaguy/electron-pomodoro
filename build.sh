#!/bin/sh

echo "Start building shared package...";
cd ./shared;
npm run build;
echo "...Done building shared package";

echo "Start building ng-fe-pomodoro package...";
cd ../ng-fe-pomodoro;
npm run build;
echo "...Done building ng-fe-pomodoro package";

echo "Start building main-preload package...";
cd ../main-preload;
npm run build;
echo "...Done building main-preload package";
