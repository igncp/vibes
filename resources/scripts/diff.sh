git diff --color $@ -- . ':!build/index.min.js' | diff-so-fancy | less --tabs=1,5 -R