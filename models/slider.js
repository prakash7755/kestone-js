'use strict';

const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * slider Model
 * ==========
 */

const Slider = new keystone.List('Slider', {
    map: { name: 'title' },
    autokey: { path: 'slug', from: 'title', unique: true },
});

Slider.add({
    title: { type: String, required: true },
    image: { type: Types.CloudinaryImage },
});

Slider.register();