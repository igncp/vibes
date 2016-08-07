#!/bin/bash

ABSOLUTE_DIR=$(dirname "$(readlink -f "$0")")

INDEX_ENV=${1:-"NULL"}

if [ $INDEX_ENV = "dev" ]; then
  INDEX_FILE="index"
elif [ $INDEX_ENV = "prod" ]; then
  INDEX_FILE="index.min"
else
  echo "Unknown environment as the first argument. Possibilities are: 'dev' and 'prod'"
  exit 1
fi

cat > $ABSOLUTE_DIR/../../index.html <<EOL
<html>
<!-- THIS FILE IS GENERATED AUTOMATICALLY. DON'T MODIFY IT AS IT WILL BE OVERRIDEN -->
<head>
    <meta charset="UTF-8">
    <title>Vibes</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBDoNT7l6tvk31CFLLA7stYv9ZHGj9NjH8" async defer></script>
</head>
<body>
<div id="main-vibes"></div>
<script src="build/$INDEX_FILE.js"></script>
</body>
</html>
EOL
