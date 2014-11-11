module.exports = function(env, callback) {
    var defaults, options, updateOptions;
    options = null;
    defaults = {
	projects: 'projects'
    };
    updateOptions = function() {
	var key, value, _results;
	options = env.config.projectsHelper || {};
	_results = [];
	for (key in defaults) {
	    value = defaults[key];
	    _results.push(options[key] != null ? options[key] : options[key] = defaults[key]);
	}
	return _results;
    };
    if (!env.helpers.getProjects) {
	env.helpers.getProjects = function(contents) {
	    var projects;
	    updateOptions();
	    projects = contents[options.projects]._.pages;
	    projects.sort(function(a, b) {
		return a.metadata.priority - b.metadata.priority || b.date - a.date;
	    });
	    return projects;
	};
    }
    updateOptions();
    return callback();
};
