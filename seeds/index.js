const mongoose = require('mongoose');
const campground = require('../models/campground');
const {descriptors , places} = require('./seedHelpers');
const cities = require('./cities');

const dbUrl = process.env.DB_URL ||'mongodb://localhost:27017/yelp-camp';
console.log("HI");
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console,"Connection Error!"));
db.once('open', () => {
    console.log("Database connection")
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    try{
    await campground.deleteMany({});
    for(let i=0; i<300; i++ ) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 20 ;
        const camp = new campground({
            author: '60dd615e66204d30f82d8322',
            title : `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            price,
            description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis impedit, alias commodi dolores, iusto temporibus earum sunt dolorem, voluptatem in hic natus! Consectetur aut placeat quas laborum voluptate, error eos.',
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images : [  
                {
                    url : "https://res.cloudinary.com/rrmmp/image/upload/v1625676410/YelpCamp/tkx1grqzgqx2gk6gascf.jpg",
                    filename : "YelpCamp/tkx1grqzgqx2gk6gascf" 
                }, 
                {
                    url : "https://res.cloudinary.com/rrmmp/image/upload/v1625676397/YelpCamp/guuovw72qasrmkasly5d.jpg", 
                    filename : "YelpCamp/guuovw72qasrmkasly5d" 
                }
            ]
        });
        await camp.save();
    }
    }catch(error){
        console.log(error);
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})