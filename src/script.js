"use strict";

const response = await fetch('./assets/gifts.json');
const products = await response.json();