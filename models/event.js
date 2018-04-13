'use strict';
const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * Event Model
 * ==========
 */

const Event = new keystone.List('Event', {
    map: { name: 'title' },
    autokey: { path: 'slug', from: 'title', unique: true },
});

Event.add({
    title: { type: String, required: true },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    author: { type: Types.Relationship, ref: 'Y', index: true },
    publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
    image: { type: Types.CloudinaryImage },
    content: {
        brief: { type: Types.Html, wysiwyg: true, height: 150 },
        extended: { type: Types.Html, wysiwyg: true, height: 400 },
    },
     eventcategories: { type: Types.Relationship, ref: 'PostCategory', many: true },
});

Event.schema.virtual('content.full').get(function () {
    return this.content.extended || this.content.brief;
});

Event.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Event.register();