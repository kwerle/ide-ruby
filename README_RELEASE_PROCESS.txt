git hf release start X.Y.Z (next version)

apm publish [<newversion> | major | minor | patch | build]
Use your damn github personal access token because you use 2fa https://github.com/settings/tokens

git commit -am Bump

git hf release finish X.Y.Z
