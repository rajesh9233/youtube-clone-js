const API_KEY = "AIzaSyBWGCzvdNdUd3KcCz2kMAeTfoHq907fYjE";
const apiURi = "https://www.googleapis.com/youtube/v3";
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const videosRow = document.getElementById('videos-row')
let videoLink = '';
let search = 'tamil songs';
let maxResults = 500;
let chartType = 'mostPopular';

searchButton.addEventListener('click',(event)=>{
    event.preventDefault();
    if(searchInput.value){
        videosRow.innerHTML = '';
        searchVideos(searchInput.value);
    }
})

async function searchVideos(q){
    try {
        const videos = await fetch(`${apiURi}/search?key=${API_KEY}&part=snippet&q=${q}&maxResults=${maxResults}`);
        const resp = await videos.json();
        console.log(q,'--->',resp.items);
        if(resp.items){
            resp.items.forEach(item => {
               let col = document.createElement('div');
               let kind = item.id.kind.split('#');
               if(kind[1] === "channel"){
                col.className = 'col-sm-12 col-md-12 col-lg-12 my-3';
                col.innerHTML = `
                <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-3">
                        <img style="border-radius:50%" class="col-sm-12 col-md-12 col-lg-6" src=${item.snippet.thumbnails.default.url}>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6">
                        <p class='lead'>${item.snippet.channelTitle}</p>
                        <p class='text-muted'>${item.snippet.description}</p>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3">

                    </div>
                </div>
                      `
               }else if(kind[1] === "video"){
               col.className = 'col-sm-12 col-md-6 col-lg-3 my-3';
              col.innerHTML = `
                    <a role="button">
                    <img src=${item.snippet.thumbnails.medium.url} class="video-link" onchange=getVideo(${item}) id=${item.id.videoId}>
                    </a>
                    <p class='lead'>${item.snippet.title}</p>
                    <p class='text-muted'>${item.snippet.channelTitle}</p>
                    `
                    
               }
               else if(kind[1] === "playlist"){
                col.className = 'col-sm-12 col-md-6 col-lg-3 my-3';
               col.innerHTML = `
                     <img src=${item.snippet.thumbnails.medium.url} >
                     <p class='lead'>${item.snippet.title}</p>
                     <p class='text-muted'>${item.snippet.channelTitle}</p>
                     `
                }
               videosRow.append(col);
            });
            // enableEvent();
        }
    } catch (error) {
        console.error(error);
    }
}

async function getVideo(item){
    try {
        const videos = await fetch(`${apiURi}/videos?key=${API_KEY}&part=snippet&q=''&maxResults=${maxResults}&id=${item.id.videoId}`);
        const resp = await videos.json();
        console.log('item','--->',resp.items);
        const videoRow = document.createElement('div');
        videoRow.className = 'row';
        if(resp.items){
            resp.items.forEach(item => {
                let col = document.createElement('div');              
                 col.className = 'col-sm-12 col-md-12 col-lg-12 my-3';
                col.innerHTML = `
                      <img src=${item.snippet.thumbnails.medium.url} >
                      <p class='lead'>${item.snippet.title}</p>
                      <p class='text-muted'>${item.snippet.channelTitle}</p>
                      `
                      videosRow.append(col);
            });
        }
    } catch (error) {
        console.error(error);
    }
}

// retrieving channel info
async function channelInfo(username){
    try {
        const channels = await fetch(`${apiURi}/channels?key=${API_KEY}&part=snippet%2CcontentDetails&q=''&maxResults=${maxResults}&forUsername=${username}`);
        const resp = await channels.json();
        console.log('channel',resp);
    } catch (error) {
        
    }
}
channelInfo('Google');

//  uploaded videos and system-generated playlist items
async function playlistInfo(){
    try {
        const channels = await fetch(`${apiURi}/playlistItems?key=${API_KEY}&part=contentDetails&q=''&maxResults=${maxResults}&playlistId=UU_x5XG1OV2P6uZZ5FSM9Ttw`);
        const resp = await channels.json();
        console.log('playlist',resp);
    } catch (error) {
        console.error(error);
    }
}
playlistInfo();
