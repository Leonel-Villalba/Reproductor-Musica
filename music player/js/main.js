// Song data 
const songList = [
    {
        title: "Moon Dust",
        file: "MoonDustSynthwave.mp3",
        cover: "1.jpg"
    },
    {
        title: 'Lobster Homeworld',
        file: 'LobsterHomeworld.mp3',
        cover: '2.jpg'
    },
    {
        title: 'Home Resonance',
        file: 'HomeResonance.mp3',
        cover: '3.jpg'
    },
]

// Cancion actual
let actualSong = null

// capturar elementos del DOm para trabajar JS
const songs = document.getElementById('songs')
const audio = document.getElementById('audio')
const cover = document.getElementById('cover')
const title = document.getElementById('title')
const play = document.getElementById('play')
const prev = document.getElementById('prev')
const next = document.getElementById('next')
const progress = document.getElementById('progress')
const progressContainer = document.getElementById('progress-container')
progressContainer.addEventListener('click', setProgress)

// escuchar el elemento audio
audio.addEventListener('timeupdate', updateProgress)

// ESCUCHAR CLICKS EN LOS CONTROLES
play.addEventListener('click', () => {
    if(audio.paused){
        playSong()
    }else{
        pauseSong()
    }
})

next.addEventListener('click', () => nextSong())
prev.addEventListener('click', () => prevSong())

// Mostrar listado de canciones
function loadSongs(){
    songList.forEach((song, index) => {
        // crear li
        const li = document.createElement('li');
        // crear a
        const link = document.createElement('a');
        // hidratar a
        link.textContent = song.title
        link.href = '#'
        // Escuchar clicks
        link.addEventListener('click',() => loadSong(index))
        // añadir a li
        li.appendChild(link)
        // añadir li a ul
        songs.appendChild(li)
    })
}

// Cargar cancion seleccionada
function loadSong(songIndex){
    if(songIndex !== actualSong){
        changeActiveClass(actualSong, songIndex)
        actualSong = songIndex
        audio.src = "./audio/" + songList[songIndex].file
        playSong()
        changeCover(songIndex)
        changeSongTitle(songIndex)
    }
}
// ACTUALIZAR PROGRESO
function updateProgress(event){
    // total y el actual
    const {duration, currentTime} = event.srcElement
    const percent = (currentTime / duration) * 100
    progress.style.width = percent + '%'
}

// HACER LA BARRA DE PROGRESO CLICKEABLE
function setProgress(event){
    const totalWidth = this.offsetWidth
    const progressWidth = event.offsetX
    const current = (progressWidth / totalWidth) * audio.duration
    audio.currentTime = current
}


// ACTUALIZAR CONTROLES
function updateControls(){
    if(audio.paused){
        play.classList.replace('fa-pause', 'fa-play')
        // play.classList.remove('fa-pause')
        // play.classList.add('fa-play')
    }else{
        play.classList.replace('fa-play', 'fa-pause')
        // play.classList.add('fa-pause')
        // play.classList.remove('fa-play')
    }
}

// Reproducir canción
function playSong(){
    if(actualSong !== null){
        audio.play()
        updateControls()
    }
}

// Pausar canción
function pauseSong(){
    audio.pause()
    updateControls()
}
// Cambiar clase activa
function changeActiveClass(lastIndex, newIndex){
    const links = document.querySelectorAll('a')
    if(lastIndex !== null){
        links[lastIndex].classList.remove('active')

    }
    links[newIndex].classList.add('active')
}

// Cambiar el cover de la cancion
function changeCover(songIndex){
    cover.src = "./img/" + songList[songIndex].cover
}

//Cambiar el titulo
function changeSongTitle(songIndex){
    title.innerText = songList[songIndex].title
}

// ANTERIOR CANCIÓN 
function prevSong(){
    if(actualSong > 0){
        loadSong(actualSong - 1)

    }else{
        loadSong(songList.length -1)
    }
}

// SIGUIENTE CANCIÓN
function nextSong(){
    if(actualSong < songList.length -1){
        loadSong(actualSong + 1)
    }else{
        loadSong(0)
    }
}

// LANZAR SIGUIENTE CANCION CUANDO SE ACABA LA ACTUAL   
audio.addEventListener('ended', () => nextSong())
// GO
loadSongs()





