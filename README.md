# Debug Viewer

## Introduction

Debug Viewer (https://debugviewer.com) is web application aimed to visualize vector graphic.
The purpose of this application is to assist [our](www.frontine-pcb.com) programmers to develop and debug geometrical algorithms.

This application supports propriety data formats defined in Frontline PCB Solutions.
 Viewer implements data loading in two ways
* Copy data from Watch Window in Microsoft Visual Studio (Ctrl-C) and paste it into the Viewer  (Ctrl-V). This option demands AUTOEXP.DAT parser will be installed in VS
* Open local file from disk in one of supported formats

Demo with preloaded data here:
https://debugviewer.com/demo

## Supported features

* Open file from disk or paste data from clipboard buffer
* Display graphic shapes: polygon, rectangle, circle, segment, arc, point.
* Manage coordinate system in current units
* Switch units between pixels, inch and mm (1 inch = 10160000 pixels, 1 mm = 400000 pixels)
* Basic navigation: zoom, pan, home (home is scaling layer to the center of the canvas)
* Display layers in different colors
* Measure distance between points
* Measure distance between selected shapes
* Display polygons in filled/outlined mode
* Display vertices and labels

## Supported browsers
Chrome is preferred browser

Tested also in Firefox, Safari and Edge. IE not supported

## How to use

### Copy/paste from the Watch Window while debugging:

* Select & Copy (Ctrl-C) data in the Watch Window
* Click on any place in the viewer except canvas and paste with Ctrl-V.

### Open xml file from local disk:

* Implement code snippet that sends data to xml file (thanks to [Benny B.](https://github.com/bennyber01) @bennyber01)
* Load file d:/fileName.xml into the Viewer 

## Technologies and dependencies

* React (react-starter-kit, react-router, react-redux and other stuff)
* redux for application state management
* createjs – java script library for creating reach object model in canvas element
* gh-pages - GitHub site free hosting
* [@flatten-js/core](https://github.com/alexbol99/flatten-js)  - algorithmic library for 2d geometrical objects

## Report issues

Please report issues here: https://github.com/alexbol99/debug-viewer/issues

Application is in use in Frontline PCB Solutions since October, 2017











