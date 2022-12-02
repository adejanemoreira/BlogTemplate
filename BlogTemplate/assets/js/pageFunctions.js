const API_URL = 'https://6388fbf0a4bb27a7f796c4f7.mockapi.io/'
const USER = 1

const loadMore = async () => {

  fetch(`${API_URL}/user/${USER}/posts`, {
    method: 'GET',
  }).then(response => response.json())
    .then(response => parseResult(response))
    .catch(err => console.error(err));
}


const parseResult = async (result) => {
  const body = document.querySelector('#default-post')
  const userInfo = await getUserInfo()

  result.forEach(post => {
    body.appendChild(addNewPost(post, userInfo).cloneNode(true))
  });

  if (result.length > 1) {
    body.children.item(0).style.display = 'none'
  }
}


const addNewPost = (post, userInfo) => {
  const defaultCard = document.querySelector('#default-post .default-post')

  defaultCard.style.display = 'block'
  defaultCard.querySelector('.default-post-title').innerHTML = post.titlePost
  defaultCard.querySelector('.default-post-subtitle').innerHTML = post.captionPost
  defaultCard.querySelector('.fa-comment').innerHTML = post.countComments
  defaultCard.querySelector('.fa-heart').innerHTML = post.countLikes
  defaultCard.querySelector('.fa-twitter').innerHTML = post.countTwitter
  defaultCard.querySelector('.fa-facebook-f').innerHTML = post.countFacebook
  defaultCard.querySelector('.image.featured > img').src = post.imagePost
  defaultCard.querySelector('.description').innerHTML = post.textPost
  defaultCard.querySelector('.author-avatar span').innerHTML = `@${userInfo.userName}`
  defaultCard.querySelector('.author-avatar img').src = userInfo.avatar

  return defaultCard
}


const getUserInfo = async () => {
  const data = await fetch(`${API_URL}/user/${USER}/`, {
    method: 'GET',
  })

  return data.json()
}