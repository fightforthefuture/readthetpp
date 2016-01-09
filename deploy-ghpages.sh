#!/bin/bash
cd dist || exit 0;

if  [ "$TRAVIS" = "true" -a "$TRAVIS_PULL_REQUEST" = "false" ]
  then
    (cp ../CNAME ./CNAME
     git init
     git config user.name "Travis-CI"
     git config user.email "travis@example.org"
     git add .
     git commit -m "Deployed to Github Pages"
     git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
    )
fi
