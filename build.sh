#!/bin/sh

echo "Start building shared package...";
cd ./shared;
npm run build;
echo "...Done building shared package";

echo "Start building ng-fe-pomodoro package...";
cd ../ng-fe-pomodoro;
npm run build;
echo "...Done building ng-fe-pomodoro package";

echo "Start building electron package...";
cd ../electron;
npm run build;
echo "...Done building electron package";
