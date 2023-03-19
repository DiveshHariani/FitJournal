import { Model, model } from "mongoose";
import userSchema from "./users.schema";
import IUser from "./users.type";

export default model<IUser>("user", userSchema);