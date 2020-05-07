/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
const cards = document.querySelector('.cards');

// axios.get(`https://api.github.com/users/drew-ross`)
//   .then(result => {
//     let data = result.data;
//     cards.append(cardCreator({ imageUrl: data.avatar_url, profileName: result.data.name, profileUserName: result.data.login, profileLocation: result.data.location, githubUrl: result.data.html_url, profileFollowers: result.data.followers, profileFollowing: result.data.following, profileBio: result.data.bio }))
//   })
//   .catch(error => console.log(error));

const getGitHub = (url) => {
  return axios.get(url);
}

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/
getGitHub('https://api.github.com/users/drew-ross')
  .then(result => {
    cards.append(cardCreator(result.data));
  })
  .catch(error => console.log(error));
/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

//GitHub restricts the number of allowed API calls per hour. This method only requires a single API call, but does not get all information, such as name and bio etc.

// getGitHub('https://api.github.com/users/drew-ross/following')
//   .then(result => {
//     result.data.forEach(person => {
//       cards.append(cardCreator({ imageUrl: person.avatar_url, profileName: person.name, profileUserName: person.login, profileLocation: person.location, githubUrl: person.html_url, profileFollowers: person.followers, profileFollowing: person.following, profileBio: person.bio }));
//     })
//   });



//ACTUAL STEP 5
// const followingArray = ['mrzacsmith', 'Impulse2020', 'ferror18', 'karenwinnielei', 'JDMTias'];

// followingArray.forEach(user => {
//   getGitHub(`https://api.github.com/users/${user}`)
//     .then(result => {
//       const person = result.data;
//       cards.append(cardCreator({ imageUrl: person.avatar_url, profileName: person.name, profileUserName: person.login, profileLocation: person.location, githubUrl: person.html_url, profileFollowers: person.followers, profileFollowing: person.following, profileBio: person.bio }));
//     })
// });



/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

/*
  List of LS Instructors Github usernames:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/

const cardCreator = (dataObj) => {

  const card = document.createElement('div');
  const cardInfo = document.createElement('div');
  const userImage = document.createElement('img');
  const name = document.createElement('h3');
  const userName = document.createElement('p');
  const location = document.createElement('p');
  const profile = document.createElement('p');
  const followers = document.createElement('p');
  const following = document.createElement('p');
  const bio = document.createElement('p');
  const github = document.createElement('a');

  card.classList.add('card');
  cardInfo.classList.add('card-info');
  name.classList.add('name');
  userName.classList.add('user-name');

  userImage.src = dataObj.avatar_url;
  github.href = dataObj.html_url;

  name.textContent = dataObj.name;
  userName.textContent = dataObj.login;
  location.textContent = `Location: ${dataObj.location}`;
  github.textContent = dataObj.html_url;
  profile.innerHTML = `Profile: ${github}`;
  followers.textContent = `Followers: ${dataObj.followers}`;
  following.textContent = `Following: ${dataObj.following}`;
  bio.textContent = `Bio: ${dataObj.bio}`;

  cardInfo.append(name, userName, location, profile, followers, following, bio);
  card.append(userImage, cardInfo);

  return card;
}


///STRETCH

getGitHub('https://api.github.com/users/drew-ross/following')
  .then(result => {
    const follows = [];
    result.data.forEach(person => follows.push(person.url));
    return follows;
  })
  .then(follows => {
    follows.forEach(user => {
      getGitHub(user)
        .then(result => {
          // debugger;
          cards.append(cardCreator(result.data));
        })
    })
  })
  .catch(error => console.log(error));