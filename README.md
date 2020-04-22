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

## Activating/deactivating sections in the home page, and moving them
The various sections, each of which has different kinds of thing in it,
are in `content/home/`. To activate or deactivate one, open the appropriate
markdown file and edit the `active` flag. To move them up or down,
edit the `weight` (ascending order: higher goes further down the page).




## Creating new items
Either do it by hand by creating a new directory under `content/<type>/`
or use `hugo new`, for example

    hugo new --kind post post/<post_name>

## Creating new pages
To create a new page of widgets, create a new directory under
`content` with the page name. Add an `index.md` with the following data
format:
```
---
title: "Landing Page"  # Add a page title.
summary: "Hello!"  # Add a page description.
date: "2019-01-01T00:00:00Z"  # Add today's date.
type: "widget_page"  # Page type is a Widget Page
---
```
Now we can use the Page Builder stuff in Academic:
[PageBuilder](`https://sourcethemes.com/academic/docs/page-builder/`)
