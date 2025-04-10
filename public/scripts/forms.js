// PACKAGES

// DATE INPUTS FOR EACH STUDENT ACTING FUNNY

// document.addEventListener("DOMContentLoaded", function () {
//     console.log('running')
//     flatpickr(".date-picker", {
//         dateFormat: "Y-m-d", // Custom format
//         // minDate: "today", // Prevent past dates
//         enableTime: false // Disable time selection
//     });
// });

// ELEMENTS

// Form steps
let formSteps = document.querySelectorAll('.form-step')
const nextBtns = document.querySelectorAll('.next-btn')
const backBtns = document.querySelectorAll('.back-btn')
let formStepsNum = 0

// Enrolling inputs
const enrollingSelect = document.querySelector('.enrolling-select')
const enrollingInputsContainer = document.querySelector('.enrolling-inputs-container')

// Learner form steps
const learnerFormStepsContainer = document.querySelector('.learners-form-steps-container')
let learnerFormStepsNum = 0

let schoolSelectNum = 0;


// EVENTS

nextBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        formStepsNum++;
        if (formStepsNum === 2) {
            learnerFormStepsNum = 0;
            createLearnerSteps()
        }
        updateFormSteps()
    })
})

backBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        formStepsNum--;
        updateFormSteps()
    })
})

enrollingSelect.addEventListener('change', e => {
    try {
        const enrollingNum = parseInt(enrollingSelect.value)
        updateLearnersEnrolling(enrollingNum)
    } catch (error) {
        console.log(`Error ${error}`)
        console.log('not a number')
    }
})

// schoolSelect.addEventListener('change', e => {
//     if (e.target.value === 'Other') {
//         console.log('learner goes to another school');
//         schoolInput.classList.remove('d-none')
//     } else {
//         schoolInput.classList.add('d-none')
//     }
// })


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

const createLearnerSteps = () => {
    console.log('creating learner steps')
    const learnerDetails = []

    const learnerNames = document.querySelectorAll('.learner-name')
    const learnerSurnames = document.querySelectorAll('.learner-surname')
    const learnerGenders = document.querySelectorAll('.learner-gender')

    for (let i = 0; i < enrollingSelect.value; i++) {
        learnerDetails.push({
            name: learnerNames[i].value,
            surname: learnerSurnames[i].value,
            gender: learnerGenders[i].value,
        })
    }
    let content = ``

    for (let i = 0; i < learnerDetails.length; i++) {
        content += `
            <div class="learner-form-step ${i === 0 ? "learner-form-step-active" : ""}">
                <h4 class="d-flex align-items-center justify-content-center rounded-top-3 py-1"
                    style="background-color: ${learnerDetails[i].gender === 'M' ? "lightsteelblue" : "pink"};">
                    ${learnerDetails[i].name} ${learnerDetails[i].surname}
                </h4>
                <div class="input-group mb-3">
                    <div class="form-floating">
                        <input type="text" id="datepicker" name="learners[birthdate]"
                            class="form-control date-picker" placeholder="birthdate">
                        <label for="datepicker">Date of Birth</label>
                    </div>
                    <span class="input-group-text" id="name">
                        <i class="bi bi-calendar-event"></i>
                    </span>
                </div>
                <div class="input-group mb-3">
                    <div class="form-floating">
                        <select id="school" name="learners[school]" class="form-select school-select"
                            aria-label="school">
                            <option selected>Select an option</option>
                            <option>Sunningdale</option>
                            <option>Milnerton Primary School</option>
                            <option>Edgemead High School</option>
                            <option>Edgemead Primary School</option>
                            <option>Other</option>
                        </select>
                        <label for="school">School</label>
                    </div>
                    <span class="input-group-text" id="school">
                        <i class="fa-solid fa-school-flag"></i>
                    </span>
                </div>
                <div class="input-group mb-3 school-input-container d-none">
                    <div class="form-floating">
                        <input id="school-input" name="learners[otherSchool]" type="text"
                            class="form-control school-input" placeholder="school-input">
                        <label for="school-input" class="form-label">Enter the name of the school
                            here</label>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <div class="form-floating">
                        <select id="venue" name="learners[venue]" class="form-select"
                            aria-label="venue">
                            <option selected>Select an option</option>
                            <option>KIA Office</option>
                            <option>Zastron Studio (Milnerton)</option>
                            <option>Edgemead High School</option>
                            <option>Kensio House</option>
                        </select>
                        <label for="venue">Venue</label>
                    </div>
                    <span class="input-group-text" id="school">
                        <i class="bi bi-geo-alt-fill"></i>
                    </span>
                </div>
                <div class="form-floating mb-3">
                    <textarea name="learners[note]" class="form-control" placeholder="Notes" id="notes"
                        style="height: 100px; resize: none"></textarea>
                    <label for="notes">Anything to take note of ${learnerDetails[i].name} (Allergies/Conditions/etc)</label>
                </div>
                <div class="d-flex justify-content-center">
                    <button type="button" class="learner-back-btn border border-none fs-4 rounded-circle p-0 mx-2"
                        style="transform: scaleX(-1);">
                        <i class="bi bi-arrow-right-circle-fill"></i>
                    </button>
                    <button type="button" class="learner-next-btn border border-none fs-4 rounded-circle p-0 mx-2">
                        <i class="bi bi-arrow-right-circle-fill"></i>
                    </button>
                </div>
            </div>
        `
    }

    learnerFormStepsContainer.innerHTML = content
    const learnerFormSteps = document.querySelectorAll('.learner-form-step')
    const learnerNextBtns = document.querySelectorAll('.learner-next-btn')
    const learnerBackBtns = document.querySelectorAll('.learner-back-btn')
    const learnerDatePickers = document.querySelectorAll('.date-picker')


    learnerNextBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            if (learnerFormStepsNum !== learnerFormSteps.length - 1) {
                learnerFormStepsNum++
                updateLearnerFormSteps(learnerFormSteps)
            } else {
                console.log('last one')
            }
        })
    })

    learnerBackBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            if (learnerFormStepsNum !== 0) {
                learnerFormStepsNum--;
                updateLearnerFormSteps(learnerFormSteps)
            } else {
                console.log('first one')
            }
        })
    })

    learnerDatePickers.forEach(picker => {
        flatpickr(picker, {
            dateFormat: "Y-m-d", // Custom format
            // minDate: "today", // Prevent past dates
            enableTime: false // Disable time selection
        });
    })

    // School input
    const schoolSelects = document.querySelectorAll('.school-select')
    const schoolInputContainers = document.querySelectorAll('.school-input-container')
    const schoolInputs = document.querySelectorAll('.school-input')

    schoolSelects.forEach((select, i) => {
        select.addEventListener('change', e => {
            if (select.value === 'Other') {
                console.log('learner went to another school')
                schoolInputContainers[i].classList.remove('d-none')
            } else {
                schoolInputContainers[i].classList.add('d-none')
            }
        })
    })
    
}

const updateLearnerFormSteps = (learnerFormSteps) => {
    learnerFormSteps.forEach(step => {
        step.classList.contains('learner-form-step-active')
            && step.classList.remove('learner-form-step-active')
    })

    learnerFormSteps[learnerFormStepsNum].classList.add('learner-form-step-active')
}
