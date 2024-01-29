'use strict';

const response = await fetch('./nonograms.json');
const nonograms = await response.json();
