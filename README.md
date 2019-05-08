# Debug Viewer

![screenshot](https://user-images.githubusercontent.com/6965440/57380941-a94ca280-71b2-11e9-9b8f-9a5f56a2155a.JPG)

## Introduction

Debug Viewer (https://debugviewer.com) is web application aimed to visualize vector graphic.
The purpose of this application is to assist [our](www.frontine-pcb.com) programmers to develop and debug geometrical algorithms.

This application supports propriety data formats defined in Frontline PCB Solutions.
 Viewer implements data loading in two ways
* Copy data from Watch Window in Microsoft Visual Studio (Ctrl-C) and paste it into the Viewer  (Ctrl-V). This option demands AUTOEXP.DAT parser will be installed in VS
* Open file from local disk in one of supported formats

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
* Display polygons in solid or wireframe mode
* Display vertices and labels

## Supported browsers
Chrome is preferred browser

Tested also in Firefox, Safari and Edge. IE not supported

## How to use

### Copy/paste from the Watch Window while debugging:

* Select & Copy (Ctrl-C) data in the Watch Window
* Click on any place in the viewer except canvas and paste with Ctrl-V.

### Open file from local disk:

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

## Example

Copy the following fragment and paste it into viewer
```text
+		[0]	{nrec=27 nalloc=27 h_ind_id=-1 ...} mat_cont_hdr_struc	mat_cont_struc
+		[1]	{pmin=59146400,5973200 pmax=59606001,6438000} mat_cont_lim_struc	mat_cont_struc
+		[2]	{nedge=23 nalloc=25 ntop=2 ...} mat_cont_poly_struc	mat_cont_struc
+		[3]	{pmin=59146400,5973200 pmax=59606001,6438000} mat_cont_lim_struc	mat_cont_struc
+		[4]	{ps=59192738,6363124 pe=59216000,6372800 pc=59216000,6340000 cw=1} mat_curve_struc	mat_cont_struc
+		[5]	{ps=59216000,6372800 pe=59267652,6372800} mat_seg_struc	mat_cont_struc
+		[6]	{ps=59267652,6372800 pe=59267652,6307200 pc=59360000,6340000 cw=1} mat_curve_struc	mat_cont_struc
+		[7]	{ps=59267652,6307200 pe=59229586,6307200} mat_seg_struc	mat_cont_struc
+		[8]	{ps=59229586,6307200 pe=59212000,6289614} mat_seg_struc	mat_cont_struc
+		[9]	{ps=59212000,6289614 pe=59212000,6056386} mat_seg_struc	mat_cont_struc
+		[10]	{ps=59212000,6056386 pe=59229586,6038800} mat_seg_struc	mat_cont_struc
+		[11]	{ps=59229586,6038800 pe=59469614,6038800} mat_seg_struc	mat_cont_struc
+		[12]	{ps=59469614,6038800 pe=59487200,6056386} mat_seg_struc	mat_cont_struc
+		[13]	{ps=59487200,6056386 pe=59487200,6100500} mat_seg_struc	mat_cont_struc
+		[14]	{ps=59487200,6100500 pe=59434000,6180000 pc=59520000,6180000 cw=1} mat_curve_struc	mat_cont_struc
+		[15]	{ps=59434000,6180000 pe=59552800,6100500 pc=59520000,6180000 cw=1} mat_curve_struc	mat_cont_struc
+		[16]	{ps=59552800,6100500 pe=59552800,6042800} mat_seg_struc	mat_cont_struc
+		[17]	{ps=59552800,6042800 pe=59543124,6019538 pc=59520000,6042800 cw=1} mat_curve_struc	mat_cont_struc
+		[18]	{ps=59543124,6019538 pe=59506462,5982876} mat_seg_struc	mat_cont_struc
+		[19]	{ps=59506462,5982876 pe=59483200,5973200 pc=59483200,6006000 cw=1} mat_curve_struc	mat_cont_struc
+		[20]	{ps=59483200,5973200 pe=59216000,5973200} mat_seg_struc	mat_cont_struc
+		[21]	{ps=59216000,5973200 pe=59192738,5982876 pc=59216000,6006000 cw=1} mat_curve_struc	mat_cont_struc
+		[22]	{ps=59192738,5982876 pe=59156076,6019538} mat_seg_struc	mat_cont_struc
+		[23]	{ps=59156076,6019538 pe=59146400,6042800 pc=59179200,6042800 cw=1} mat_curve_struc	mat_cont_struc
+		[24]	{ps=59146400,6042800 pe=59146400,6303200} mat_seg_struc	mat_cont_struc
+		[25]	{ps=59146400,6303200 pe=59156076,6326462 pc=59179200,6303200 cw=1} mat_curve_struc	mat_cont_struc
+		[26]	{ps=59156076,6326462 pe=59192738,6363124} mat_seg_struc	mat_cont_struc
```

The result will be the picture like this:
![example](https://user-images.githubusercontent.com/6965440/57382331-7061fd00-71b5-11e9-9489-90793123b755.JPG)









