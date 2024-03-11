// // renderer.js
// const { ipcRenderer } = require('electron');

// function fetchAPI() {
//   var searchData = document.getElementById('Search').value;

//   ipcRenderer.invoke('fetchAPI', searchData)
//     .then((result) => {
//       if (result) {
//         console.log(result.idMeal);
//         console.log(result.strArea);
//       } else {
//         console.log('No meal found.');
//       }
//     })
//     .catch((error) => {
//       console.error('Error fetching data from main process:', error);
//     });
// }
