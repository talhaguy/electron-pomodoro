#!/bin/sh

echo "Start building shared package...";
cd ./shared;
npm run build;
echo "...Done building shared package";

echo "Start building ng-ui package...";
cd ../ng-ui;
npm run build;
echo "...Done building ng-ui package";

echo "Start building electron package...";
cd ../electron;
npm run build:distribute;
echo "...Done building electron package";
