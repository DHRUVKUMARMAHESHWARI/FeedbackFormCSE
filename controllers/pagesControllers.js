exports.getHomePage = (req, res) => {
    res.render('homepage');
};

exports.getFeedbackPage = (req, res) => {
    res.render('feedback');
};

exports.getFormPage = (req, res) => {
    res.render('form');
};

exports.getDataVisualizePage = (req, res) => {
    res.render('DataVisualize');
};

exports.getProfilePage = (req, res) => {
    res.render('profile');
};

exports.getSignupPage = (req, res) => {
    res.render('signup');
};
