# Debug Viewer

## Introduction

Debug Viewer is a simple single page application aimed to visualize graphic data, mainly polygons, in a canvas. The purpose of this application is to assist our programmers to develop and debug geometrical algorithms.

This application supports propriate data formats defined in Frontline PCB Solutions. Viewer implemets data loading in two ways
* Copy data from Watch Window in Microsoft Visual Studio (Ctrl-C) and paste it into the Viewer  (Ctrl-V). This option demands AUTOEXP.DAT parser will be installed in VS
* Export data to debug file in xml format and import it into the Viewer

Viewer is a static application and has no server interaction. All files are loaded from locally accessible places.

Demo with preloaded data here:
https://alexbol99.github.io/debug-viewer/#demo

## Supported features

* Input file from disc or paste data from clipboard buffer
* Display graphic shapes: polygon, segment, arc, point.
(Support polygons with arcs, with holes and comprised from multiple islands)
* Manage coordinate system in current units
* Switch units between pixels, inch and mm (1 inch = 10160000 pixels, 1 mm = 400000 pixels)
* Basic navigation: zoom, pan, home (home is scaling layer to center)
* Display layers in different colors
* Measure distance (between points, between polygons)
* Display polygons in filled/outlined mode
* Display vertices and labels

## How to use

1. Load from xml file:

* Implement code snippet that sends data to xml file (thanks to [Benny B.](https://github.com/bennyber01) @bennyber01)
* Open Debug Viewer in Chrome (Chrome works better, tested also in Firefox, Safari and Edge. IE not supported)
* Load file d:/fileName.xml into the Viewer 

2. Copy/paste from the Watch Window while debugging:

* Select & Copy (Ctrl-C) data in the Watch Window
* Click on any place in the viewer except canvas and press Ctrl-V

## Technologies and dependancies

* ReactJS for building Components (initialized with react-starter-kit)
* Redux for application state management
* CreateJS – java script library for creating reach object mmodel in canvas element
* GitHub Pages - site free hosting
* Flatten - [flatten-js](https://github.com/alexbol99/flatten-js) algorithmic library for 2d geometrical objects

## Report issues

Please report issues [here](https://github.com/alexbol99/debug-viewer/issues)

Application is in use in Frontline PCB Solutions since October, 2017











