export interface IExercise {
    exercise_name: string,
    sets: [{
        weight_lifted: number,
        number_of_reps: number
    }]
}