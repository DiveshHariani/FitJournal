import { IExercise } from "../exercises/exercise.type"
export interface IWorkout {
    name: string,
    date: Date,
    exercises: [IExercise]
}