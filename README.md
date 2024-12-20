# Jim's University Web Page

## Installing

* download hugo extended .deb file from
`https://github.com/gohugoio/hugo/releases`
* install with `dpkg -i <name>.deb`
* clone this repo into `jcf12`, e.g. 
`git clone git@github.com:jimfinnis/jcf12
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
but if you want it accessible from outside (e.g. running on cranberry)
```
    hugo server --baseURL http://cranberry.lan --bind cranberry.lan
```
It will be accessible on port 1313 in both cases.

## Activating/deactivating sections in the home page, and moving them
The various sections, each of which has different kinds of thing in it,
are in `content/home/`. To activate or deactivate one, open the appropriate
markdown file and edit the `active` flag. To move them up or down,
edit the `weight` (ascending order: higher goes further down the page).




## Creating new items
Either do it by hand by creating a new directory under `content/<type>/`
or use `hugo new`, for example

    hugo new --kind post blog/<post_name>
    
will create a new post in the `blog` section. That `blog` is really
a page, and you could go to `/research` to just see research items,
but because that has no index it has to invent a title.

Currently the blog is commented out - it's the `blog` page (see below)
but its entry in the menu file (see below again) is commented.

## Creating new pages
To create a new page of widgets, create a new directory under
`content` with the page name. Add an `index.md` with the following data
format:
```
---
title: "Landing Page"  # Add a page title. (required)
summary: "Hello!"  # Add a page description. (optional)
date: "2019-01-01T00:00:00Z"  # Add today's date (optional)
type: "widget_page"  # Page type is a Widget Page (required)
---
```
Now we can use the Page Builder stuff in Academic:
[PageBuilder](`https://sourcethemes.com/academic/docs/page-builder/`),
or just copy widget sections over as markdown files from `home`.

Look at the `blog` directory for an example. To create links to this, edit
`config/_default/menus.toml`.
