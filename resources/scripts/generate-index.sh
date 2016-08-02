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
    <script   src="https://code.jquery.com/jquery-3.1.0.min.js" integrity="sha256-cCueBR6CsyA4/9szpPfrX3s49M9vUU5BgtiJj06wt/s=" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
<body>
<div id="main-vibes"></div>
<script src="dist/$INDEX_FILE.js"></script>
</body>
</html>
EOL
