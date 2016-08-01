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
</head>
<body>
<div id="main-vibes"></div>
<script src="dist/$INDEX_FILE.js"></script>
</body>
</html>
EOL
