export function fetchBreeds(url, query) {
  return new Promise((resolve, reject) => {
    const querystring = new URLSearchParams(query);
    fetch(`${url}?${querystring}`)
      .then(response => {
        if (!response.ok) {
          reject(`Error code ${response.status}`);
        } else {
          return response.json();
        }
      })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function fetchCatByBreed(breedId) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=live_rZzH8aTSb8EgvoUpMxGnwE4BaOpFs1yxswJogZfxRC4o5Mo0oZR6Pv4xvrcRihcn`
    )
      .then(response => {
        if (!response.ok) {
          reject(`Error code ${response.status}`);
        } else {
          return response.json();
        }
      })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
}
