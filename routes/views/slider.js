const keystone = require('keystone');

exports = module.exports = function (req, res) {

    const view = new keystone.View(req, res);


    const locals = res.locals;

    // Init locals
    locals.section = 'eventblog';
    locals.filters = {
        eventcategory: req.params.category,
    };


    // Set locals
    locals.section = 'slider';
    locals.data = {
        titles: [],  //maybe this is a problem?
        images: [],  //maybe this is a problem?
        events: [],
        eventcategories: [],
    }


    // locals.section is used to set the currently selected
    // item in the header navigation.
    // locals.section = 'home';

    view.on('init', function (next) {

        const q = keystone.list('Event').paginate({
            page: req.query.page || 1,
            perPage: 3,
            maxPages: 1,
            filters: {
                state: 'published',
            },
        })
            .sort('-publishedDate')
            .populate('author categories');

        if (locals.data.eventcategory) {
            q.where('categories').in([locals.data.eventcategory]);
        }


        q.exec(function (err, results) {
            locals.data.events = results;
            next(err);
        });

    });


}

