var gs = require('github-scraper');

var username = '/mehul-m-prajapati';

// Function to get followers data
async function getFollowersData(url) {
    return new Promise((resolve, reject) => {
        gs(url, function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

async function main() {
    // Initial username and URL
    var cleanedUsername = username.split('/').join('');
    var url = `${cleanedUsername}/followers`; // Construct followers URL

    // First API call
    try {
        let data = await getFollowersData(username);
        console.log(data); // Process the initial data

        // Second API call
        //let followersData = await getFollowersData(url);
        //console.log(followersData); // Process the followers data

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Start the execution
main();
