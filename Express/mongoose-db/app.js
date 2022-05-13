const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/personDB');

const PersonSchema = mongoose.Schema({
name: {
    type: String,
    required: [true,"Name is required"]
} ,
age: Number
})

const Person = mongoose.model('Person', PersonSchema);

const person1 = Person({name:"Shlok",age:19});
// person1.save().then(() => console.log('person1 save'));

Person.find(function(err,people){
    mongoose.connection.close();
    people.forEach(function(person){
        console.log(person.name);
    })
});

// Person.updateOne({_id: "623ca60c83300fce70214cd3"},{name: "Rucha"}, function(err){
//     if(err){
//         console.log(err);
//     } else{
//         console.log("Successfully updated");
//     }
// });

// Person.deleteOne({name: "Shlok"},function(err){
//     if(err){
//         console.log(err);
//     } else {
//         console.log("Deleted");
//     }
// });