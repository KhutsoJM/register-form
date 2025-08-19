import User from "../models/User.js"
import Learner from '../models/Learner.js'
import Country from "../models/Country.js"


export const getForm = async (req, res) => {
    const countries = await Country.find()
    res.status(200).render('users/create', { countries })
}

export const submitForm = async (req, res) => {

    const {
        name,
        surname,
        email,
        address,
        callingCode,
        number,
        enrolling,
        nationality,
        country,
        city,
        postalCode,
        learners,
    } = req.body;
    console.log(enrolling);
    async function createLearners() {
        const learnerIDs = []

        if (enrolling == 1) {
            console.log("enrolling one")
            let learnerSchool;
            learners.school === 'Other' ? learnerSchool = learners.otherSchool : learnerSchool = learners.school
            const learner = await Learner.create({
                name: learners.name,
                surname: learners.surname,
                gender: learners.gender,
                birthdate: learners.birthdate,
                school: learnerSchool,
                venue: learners.venue,
                note: learners.note,
            })
            console.log(learners.name, learners.venue)
            learnerIDs.push(learner._id)
        } else {
            console.log("enrolling more than one")
            for (let i = 0; i < enrolling; i++) {
                let learnerSchool;
                learners.school[i] === 'Other' ? learnerSchool = learners.otherSchool[i] : learnerSchool = learners.school[i]
                const learner = await Learner.create({
                    name: learners.name[i],
                    surname: learners.surname[i],
                    gender: learners.gender[i],
                    birthdate: learners.birthdate[i],
                    school: learnerSchool,
                    venue: learners.venue[i],
                    note: learners.note[i],
                })

                learnerIDs.push(learner._id)
            }
        }

        return learnerIDs
    }

    try {
        const learnerIDs = await createLearners()
        await User.create({
            ...req.body,
            learners: learnerIDs
        })
        res.render('users/thanksMessage')
        // res.status(200).json({ success: true, data: user })
    } catch (error) {
        res.status(500).json({ success: false, error: `Error in Submit Form: ${error}` })
        // res.send('Error 404: Make sure you input all values')
    }
}

export const showUsers = async (req, res) => {
    const users = await User.find()
    res.status(200).render('users/show', { users })
}
