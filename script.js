const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d")

const frames = {
    currentIndex: 0,
    maxIndex: 745
}

let loadedImages = 0
let images = []

function preLoadImages() {
    for (let i = 1; i <= frames.maxIndex; i++) {
        const img = new Image();
        const imageUrl = `./frames/frame_${i.toString().padStart(4, "0")}.jpeg`;
        img.src = imageUrl
        img.onload = () => {
            loadedImages++
            if (loadedImages === frames.maxIndex) {
                loadImage(frames.currentIndex)
                startAnimation()
            }
        }
        images.push(img)
    }
}

function loadImage(index) {
    if(index >= 0 && index <= frames.maxIndex){
        const img = images[index]

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const scale = Math.max(canvas.width / img.width, canvas.height / img.height)
        const newWidth = img.width * scale
        const newHeight = img.height * scale
        const offsetX = (canvas.width - newWidth) / 2
        const offsetY = (canvas.height - newHeight) / 2

        context.clearRect(0, 0, canvas.width, canvas.height)
        context.imageSmoothingEnabled = true
        context.imageSmoothingQuality = "high"
        context.drawImage(img, offsetX, offsetY, newWidth, newHeight)
        frames.currentIndex = index 
    }
}

function startAnimation() {
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".parent",
            start: "top top",
            scrub: 2,
        }
    }) 

    tl.to(frames, {
        currentIndex: frames.maxIndex,
        onUpdate: () => {
            loadImage(Math.floor(frames.currentIndex))
        }
    })
}

preLoadImages()