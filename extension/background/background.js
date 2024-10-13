chrome.identity.getAuthToken({interactive: true}, function(token) {
    fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + token)
        .then(response => response.json())
        .then(user => {
            // Check if the user is an admin
            if (user.email === 'admin@example.com') {
                console.log('Admin logged in');
            } else {
                console.log('User access only');
            }
        });
});
