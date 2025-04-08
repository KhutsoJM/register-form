import axios from 'axios'

const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,idd');
const countries = response.data

const data = []
for (let c of countries) {
    const name = c.name.common
    const callingCode = c.idd.root + c.idd.suffixes

    if (c.idd.root === '' || c.idd.suffixes.length > 1) {
        continue
    }
    
    data.push({
        name,
        callingCode,
    })
}

// console.log(data)
export default data
