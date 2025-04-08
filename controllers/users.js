import User from "../models/User.js"
import Learner from '../models/Learner.js'
import Country from "../models/Country.js"


export const getForm = async (req, res) => {
    const countries = await Country.find()
    console.log('getting the form')
    res.status(200).render('users/create', { countries })
}

export const submitForm = async (req, res) => {
    let learnerIDs = []

    const {
        name,
        surname,
        email,
        address,
        callingCode,
        number,
        enrolling,
        nationality,
        learners,
    } = req.body;

    const learnersData = []
    RefactorLearnerData()

    function RefactorLearnerData() {
        for (let i = 0; i < enrolling; i++) {
            learnersData.push({
                name: learners.name[i],
                surname: learners.surname[i],
                gender: learners.gender[i],
                birthdate: learners.birthdate[i],
                school: learners.school[i],
                venue: learners.venue[i],
                note: learners.note[i],
            })

            CreateLearner(learnersData[i])
        }
    }

    async function CreateLearner(data) {
        try {
            const learner = await Learner.create(data)
            learnerIDs.push(learner._id)
            // res.status(200).json({ success: true, data: learner })
        } catch (error) {
            console.log('Error in submitting form')
            res.status(500).json({ success: false, error: 'Error in form submit' })
        }
    }

    const data = {
        name,
        surname,
        email,
        address,
        enrolling,
        callingCode,
        number,
        nationality,
    }

    try {
        const user = await User.create(data)
        user.learners.push(...learnerIDs)
        await user.save()
        res.status(200).json({ success: true, data: user })
    } catch (e) {
        console.log('Error in submitting form')
        res.status(500).json({ success: false, error: 'Error in form submit' })
    }
}