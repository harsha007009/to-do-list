const modal = document.getElementById('modal');
const openModalbtn = document.getElementById('openModalBtn');
const cancelBtn = document.getElementById('cancelNewTaskbtn');
const createNewTaskBtn = document.getElementById('creatTaskbtn');
const closeModalbtn = document.getElementById('closeModalbtn');
const modalCard = modal.querySelector('div > div');

function openModal(){
    if(!modal.classList.contains('hidden'))
        return;
    
    form.reset();
    modal.classList.remove('hidden');
    gsap.fromTo(
        modalCard,
        {scale:0.5,opacity:0,y:-200},
        {scale:1,opacity:1,y:0,duration:0.3, ease: 'power2.out'}
    );
}
function closeModal(){
    gsap.to(modalCard,
        {
            scale:0.9,
            opacity:0,
            y:-200,
            duration:0.5,
            ease:'power2.in',
            onComplete: () =>{
                modal.classList.add('hidden');
            },
        });
}
openModalbtn.addEventListener('click',openModal);
closeModalbtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click',closeModal);

