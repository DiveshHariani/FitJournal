import { checkPassword } from "./hashing";
const checker = async () => {
    let result = await checkPassword("1234", "$2b$04$Snz8mrEMNNqBuwf6P0kLE.V7GDiXQeClE0IAqCtQxhwX2gCOv9xya");
    console.log(result);
}

checker();