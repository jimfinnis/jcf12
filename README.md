# Jim's University Web Page

## Installing

* download hugo extended .deb file from
`https://github.com/gohugoio/hugo/releases`
* install with `dpkg -i <name>.deb`
* clone this repo into `jcf12`, e.g. 
`git clone git@github.com:jimfinnis/academic-kickstart jcf12`
* pull the academic theme submodule:
```
cd jcf12
git submodule update --init --recursive
```
* build with `hugo`
* if you want to run a local server:
```
hugo server --baseURL http://127.0.0.1
```


