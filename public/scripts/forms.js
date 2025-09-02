// const image1 = document.querySelector('.image-1');
// const image2 = document.querySelector('.image-2');

// image2.style.display = 'block';

const images = document.querySelectorAll('.display-image');
images[0].style.display = 'block';

// prevent form from submitting after pressing enter
const form = document.querySelector('form')
form.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        console.log('enter pressed');
    }
})

const registerBtn = document.querySelector('.register-btn');

// Form steps
let formSteps = document.querySelectorAll('.form-step');
const nextBtns = document.querySelectorAll('.next-btn');
const backBtns = document.querySelectorAll('.back-btn');
let formStepsNum = 0

// Enrolling inputs
const enrollingSelect = document.querySelector('.enrolling-select');
const enrollingInputsContainer = document.querySelector('.enrolling-inputs-container');

// Learner form steps
const learnerFormStepsContainer = document.querySelector('.learners-form-steps-container');
let learnerFormStepsNum = 0
let schoolSelectNum = 0;

// Form validation
let formStepActive = document.querySelector('.form-step-active');
let validateInputs = formStepActive.querySelectorAll('input, select');

// Modal
const modalBtn = document.querySelector('.modal-btn');

const validationMessage = document.querySelector('.validation-message');


const datepicker = document.querySelector('.datepicker');
flatpickr(datepicker, {
    dateFormat: "Y-m-d", // Custom format
    // minDate: "today", // Prevent past dates
    enableTime: false // Disable time selection
});


// EVENTS
nextBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        if (validation()) {
            formStepsNum++;
            updateFormSteps();
            // updateImages(formStepsNum);
        }

        if (formStepsNum === 3) {
            learnerFormStepsNum = 0;
            createLearnerSteps();
        }
    })
})




backBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        formStepsNum--;
        updateFormSteps();
        validationMessage.classList.add('d-none');
    })
})

const validation = () => {
    let valid = true
    // validationMessage.querySelector('input').value = 'Please fill in everything';

    validateInputs.forEach(input => {
        if (input.value.trim() === '' || input.value == 'Select an option' || input.value == 'How many kids are enrolling?') {
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
            valid = false;
        } else {
            input.classList.add('is-valid');
            input.classList.remove('is-invalid');
        }
    })

    valid ? validationMessage.classList.add('d-none') : validationMessageDisplay()
    return valid;
}

const validationMessageDisplay = () => {
    validationMessage.classList.remove('d-none');
    validationMessage.style.opacity = 1;

    setTimeout(() => {
        fadeOut(validationMessage, 2000);
    }, 6000);
}

const fadeOut = (element, duration) => {
    element.style.transition = `opacity ${duration}ms`;
    element.style.opacity = 0;

    setTimeout(() => {
        element.classList.add('d-none')
    }, duration);
}

enrollingSelect.addEventListener('change', e => {
    try {
        const enrollingNum = parseInt(enrollingSelect.value)
        updateLearnersEnrolling(enrollingNum)
    } catch (error) {
        console.log(`Error ${error}`)
        console.log('not a number')
    }
})


// FUNCTIONS 
const updateFormSteps = () => {
    formSteps.forEach(step => {
        step.classList.contains('form-step-active')
            && step.classList.remove('form-step-active')
    })

    formSteps[formStepsNum].classList.add('form-step-active')

    formStepActive = document.querySelector('.form-step-active')
    validateInputs = formStepActive.querySelectorAll('input, select')
}

const updateImages = (num) => {
    num -= 1;
    console.log('image: ', images[num]);
    images[num].style.display = 'block';
    images.forEach((img, idx) => {
        if (idx !== num) {
            img.style.display = 'none';
        }
    });
}

const updateLearnersEnrolling = (amount) => {
    let content = ``

    for (let i = 0; i < amount; i++) {
        content += `
            <div class="row">
                <div class="col-md-4">
                    <div class="mb-3">
                        <div class="form-floating">
                            <input id="name" name="learners[name]" type="text" class="form-control learner-name rounded-0"
                                placeholder="name">
                            <label for="name" class="form-label">Name</label>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-floating mb-3">
                        <input id="surname" name="learners[surname]" type="text" class="form-control learner-surname rounded-0"
                            placeholder="surname">
                        <label for="surname" class="form-label">Surname</label>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-floating mb-3">
                        <select id="gender" name="learners[gender]" class="form-select learner-gender rounded-0" aria-label="gender">
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
    formStepActive = document.querySelector('.form-step-active')
    validateInputs = formStepActive.querySelectorAll('input, select')
}

const createLearnerSteps = () => {
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
                            class="form-control date-picker rounded-0" placeholder="birthdate">
                        <label for="datepicker">Date of Birth</label>
                    </div>
                    <span class="input-group-text rounded-0" id="name">
                        <i class="bi bi-calendar-event"></i>
                    </span>
                </div>
                <div class="input-group mb-3">
                    <div class="form-floating">
                        <select id="school" name="learners[school]" class="form-select school-select rounded-0"
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
                    <span class="input-group-text rounded-0" id="school">
                        <i class="fa-solid fa-school-flag"></i>
                    </span>
                </div>
                <div class="input-group mb-3 school-input-container d-none">
                    <div class="form-floating">
                        <input id="school-input" name="learners[otherSchool]" type="text"
                            class="form-control school-input rounded-0" placeholder="school-input">
                        <label for="school-input" class="form-label">Enter the name of the school
                            here</label>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <div class="form-floating">
                        <select id="venue" name="learners[venue]" class="form-select rounded-0"
                            aria-label="venue">
                            <option selected>Select an option</option>
                            <option>KIA Office</option>
                            <option>Zastron Studio (Milnerton)</option>
                            <option>Edgemead High School</option>
                            <option>Kensio House</option>
                            <option>Unsure</option>
                        </select>
                        <label for="venue">Venue</label>
                    </div>
                    <span class="input-group-text rounded-0" id="school">
                        <i class="bi bi-geo-alt-fill"></i>
                    </span>
                </div>
            
                <div class="input-group mb-3">
                    <div class="form-floating">
                        <select id="course" name="learners[course]" class="form-select rounded-0"
                            aria-label="course">
                            <option selected>Select an option</option>
                            <option>Robotics</option>
                            <option>Animation</option>
                            <option>Game Development</option>
                            <option>Unsure</option>
                        </select>
                        <label for="course">Course</label>
                    </div>
                    <span class="input-group-text rounded-0" id="school">
                        <i class="bi bi-geo-alt-fill"></i>
                    </span>
                </div>

                <div class="form-floating mb-3">
                    <textarea name="learners[note]" class="form-control rounded-0" placeholder="Notes" id="notes"
                        style="height: 100px; resize: none"></textarea>
                    <label for="notes">Anything to take note of ${learnerDetails[i].name} (Allergies/etc)</label>
                </div>
                <div class="d-flex justify-content-center">
                    <button type="button" class="learner-back-btn p-0 mx-2"
                        style="transform: scaleX(-1); background: none; border: none;">
                        <i class="bi bi-arrow-right-circle-fill fs-4"></i>
                    </button>
                    <button type="button" class="learner-next-btn p-0 mx-2"
                        style="background: none; border: none">
                        <i class="bi bi-arrow-right-circle-fill fs-4"></i>
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
            if (validation() && learnerFormStepsNum !== learnerFormSteps.length - 1) {
                learnerFormStepsNum++
                updateLearnerFormSteps(learnerFormSteps)
                console.log(`Learner ${learnerFormStepsNum}`)
            } else if (!validation()) {
                return
            } else {
                // validationMessage.querySelector('input').value = 'Click Register'
                registerBtn.classList.remove('disabled')
            }
        })
    })

    learnerBackBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            if (learnerFormStepsNum !== 0) {
                learnerFormStepsNum--;
                updateLearnerFormSteps(learnerFormSteps)
                console.log(`Learner ${learnerFormStepsNum}`)
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

    formStepActive = document.querySelector('.learner-form-step-active')
    validateInputs = Array.from(formStepActive.querySelectorAll('input, select')).filter(input => !input.classList.contains('school-input'))
}

const updateLearnerFormSteps = (learnerFormSteps) => {
    learnerFormSteps.forEach(step => {
        step.classList.contains('learner-form-step-active')
            && step.classList.remove('learner-form-step-active')
    })

    learnerFormSteps[learnerFormStepsNum].classList.add('learner-form-step-active')
    formStepActive = document.querySelector('.learner-form-step-active')
    validateInputs = Array.from(formStepActive.querySelectorAll('input, select')).filter(input => !input.classList.contains('school-input'))
    console.log(validateInputs.length)
}
