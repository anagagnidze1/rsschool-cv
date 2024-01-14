
const track = document.querySelector('.carouseltrack');
const slides = Array.from(track.children);
const nextbtn = document.querySelector('.carousel_button--right');
const prevbtn = document.querySelector('.carousel_button--left');
const dotsnav = document.querySelector('.carouselnav');
const dots = Array.from(dotsnav.children);

const slideWidth = slides[0].getBoundingClientRect().width;  

let autoScrollInterval;
const moveToNextSlide = () => {
    const current = track.querySelector('.current-slide');
    const nextSlide = current.nextElementSibling || slides[0];
    const currentDot = dotsnav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling || dots[0];

    moveToSlide(track, current, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(slides, prevbtn, nextbtn, nextIndex);
};
autoScrollInterval = setInterval(moveToNextSlide, 5000);




const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index  + 'px';
}
slides.forEach(setSlidePosition);


const moveToSlide = (track, current, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    current.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}
const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}
const hideShowArrows = (slides, prevbtn, nextbtn, targetIndex) => {
    if(targetIndex === 0){
        prevbtn.classList.add('is-hidden');
        nextbtn.classList.remove('is-hidden');
    }else if(targetIndex === slides.length - 1){
        prevbtn.classList.remove('is-hidden');
        nextbtn.classList.add('is-hidden');
    }else{
        prevbtn.classList.remove('is-hidden');
        nextbtn.classList.remove('is-hidden');
    }
}

let touchStartX = 0;
let touchEndX = 0;


track.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
});

track.addEventListener('touchmove', function (e) {
    touchEndX = e.touches[0].clientX;
});

track.addEventListener('touchend', function () {
    const swipeThreshold = 50; 

    if (touchStartX - touchEndX > swipeThreshold) {
        const current = track.querySelector('.current-slide');
        const nextSlide = current.nextElementSibling || slides[0];
        const currentDot = dotsnav.querySelector('.current-slide');
        const nextDot = currentDot.nextElementSibling || dots[0];

        moveToSlide(track, current, nextSlide);
        updateDots(currentDot, nextDot);
        hideShowArrows(slides, prevbtn, nextbtn, nextIndex);
    } else if (touchEndX - touchStartX > swipeThreshold) {
        const current = track.querySelector('.current-slide');
        const prevSlide = current.previousElementSibling || slides[slides.length - 1];
        const currentDot = dotsnav.querySelector('.current-slide');
        const prevDot = currentDot.previousElementSibling || dots[dots.length - 1];
        const prevIndex = slides.findIndex(slide => slide === prevSlide);

        moveToSlide(track, current, prevSlide);
        updateDots(currentDot, prevDot);
        hideShowArrows(slides, prevbtn, nextbtn, prevIndex);
    }
});

nextbtn.addEventListener('click', e => {
    const current = track.querySelector('.current-slide');
    const nextSlide = current.nextElementSibling || slides[0];
    const currentDot = dotsnav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling || dots[0];
    
    moveToSlide(track, current, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(slides, prevbtn, nextbtn, nextIndex);
   
    
})

prevbtn.addEventListener('click', e => {
    const current = track.querySelector('.current-slide');
    const prevSlide = current.previousElementSibling || slides[slides.length - 1];
    const currentDot = dotsnav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling || dots[dots.length - 1];
    const prevIndex = slides.findIndex(slide => slide === prevSlide);

    
    moveToSlide(track, current, prevSlide);
    updateDots(currentDot, prevDot);
    hideShowArrows(slides, prevbtn, nextbtn, prevIndex);
   
})

dotsnav.addEventListener('click', e =>{
    const targetDot = e.target.closest('button');
    if(!targetDot) return;
    
    const current = track.querySelector('.current-slide');
    const currentDot = dotsnav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];


    moveToSlide(track, current, targetSlide);
    updateDots(currentDot, targetDot);  
})


const navigation = document.querySelector('.navigation');