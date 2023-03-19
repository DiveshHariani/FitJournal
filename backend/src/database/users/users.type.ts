export interface IUser {
    "name": String,
    "password"?: String,
    "isGoogleAuth"?: Boolean,
    "email": String,
    "age"?: Number,
    "height"?: Number,
    "weight"?: Number,
    "workout"?: [{
        "name": String,
        "date": Date,
        "exercises": [
            {
                "exercise_name": String,
                "sets": [{
                    "weight_lifted": Number,
                    "number_of_reps": Number
                }]
            }
        ]
    }]
};

export default IUser;