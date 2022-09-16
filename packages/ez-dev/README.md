# `ez-dev`

> This project is contains common development tools and configs used in the lib packages : eazychart-vue and eazychart-react in order to reduce code configs redundancy (jest, eslint, tsconfig, ...).

## Structure

### JEST

This folder contains common unit tests snapshots and configs used in the lib packages : eazychart-vue and eazychart-react make sure that the libraries delivers the same results (quasi).

#### snapshots/

Directory that contains all the snap files used by Jest to match the results.

#### lib/snapshotResolver.js

#This is used for example in @eazychart-*/jest.config.js in order to point Jest to the "snapshots" folder.

#### lib/data.ts

This is mock data used for unit tests, so let's say that this is the input while the snapshots are the output.

### IMPORTANT 

Note that Jest uses the directory structure, filenames as well as the string passed to `it()` calls in order to index the snapshots. For this matter, we need to manually ensure that we have consistent file / test cases naming in order to guarantee that vue / react components are matched against the same snapshot.
