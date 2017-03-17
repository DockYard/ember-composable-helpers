# Upgrade Guide

## 1.x -> 2.x
The string helpers were broken out into a
[new project](https://github.com/romulomachado/ember-cli-string-helpers).

* String
  + `camelize`
  + `capitalize`
  + `classify`
  + `dasherize`
  + `truncate`
  + `underscore`
  + `html-safe`
  + `titleize`
  + `w`

If you project relied on any of these helpers in 1.x, you'll need to run:

```
ember install ember-cli-string-helpers
```
