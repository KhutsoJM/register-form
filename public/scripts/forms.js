// ELEMENTS

// Form steps 
const formSteps = document.querySelectorAll('.form-step')
const nextBtns = document.querySelectorAll('.next-btn')
const backBtns = document.querySelectorAll('.back-btn')

const form = document.querySelector('form')
console.log(form)

// Enrolling inputs
const enrolling = document.querySelector('.enrolling')
const enrollingInputsContainer = document.querySelector('.enrolling-inputs-container')
let formStepsNum = 0;

// School input
const school = document.querySelector('.school')
const schoolInput = document.querySelector('.school-input')



// EVENTS
nextBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        formStepsNum++;
        updateFormSteps()
    })
})

backBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        formStepsNum--;
        updateFormSteps()
    })
})


enrolling.addEventListener('change', e => {
    try {
        const enrollingNum = parseInt(enrolling.value);
        updateLearnersEnrolling(enrollingNum)
    } catch (error) {
        console.log(`Error ${error}`)
        console.log('not a number')
    }
})


school.addEventListener('change', e => {
    if (e.target.value === 'Other') {
        console.log('learner goes to another school');
        schoolInput.classList.remove('d-none')
    } else {
        schoolInput.classList.add('d-none')
    }
})


// FUNCTIONS 
const updateFormSteps = () => {
    formSteps.forEach(step => {
        step.classList.contains('form-step-active')
            && step.classList.remove('form-step-active')
    })

    formSteps[formStepsNum].classList.add('form-step-active')
}


const updateLearnersEnrolling = (amount) => {
    let content = ``

    for (let i = 0; i < amount; i++) {
        content += `
            <div class="row">
                <div class="col-md-5">
                    <div class="mb-3">
                        <div class="form-floating">
                            <input id="name" name="learners[name]" type="text" class="form-control learner-name"
                                placeholder="name">
                            <label for="name" class="form-label">Name</label>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-floating mb-3">
                        <input id="surname" name="learners[surname]" type="text" class="form-control learner-surname"
                            placeholder="surname">
                        <label for="surname" class="form-label">Surname</label>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-floating mb-3">
                        <select id="gender" name="learners[gender]" class="form-select learner-gender" aria-label="gender">
                            <option selected>M</option>
                            <option>F</option>
                            <option>Other</option>
                        </select>
                        <label for="gender">Gender</label>
                    </div>
                </div>
            </div>
        `
    }
    enrollingInputsContainer.innerHTML = content;
}
