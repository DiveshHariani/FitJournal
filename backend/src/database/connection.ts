import mongoose, { ConnectOptions } from 'mongoose';

let databaseConnection: mongoose.Connection;

const connect = (): void => {

    const URI = `mongodb+srv://hariani:${process.env.DB_KEY}@cluster0.kitdi7o.mongodb.net/?retryWrites=true&w=majority`
    if(databaseConnection)  return;

    mongoose.connect(URI, 
                {useNewUrlParser: true} as ConnectOptions)
        .then((res) => console.log("MongoDB Connected"))
        .catch((err) => {
            if(err) {
                console.log(err);
            } else {
                console.log("MongoDB Connected");
            }
        });
    return;
}

export default connect;
