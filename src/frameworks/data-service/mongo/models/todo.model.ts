import { model, Schema } from "mongoose";
import messages from "../../../../config/messages";
import { Todo } from "../../../../core";

const todoSchema: Schema = new Schema(
  {
    label: {
      type: String,
      required: [true, messages.validation.todo.label.notProvided],
      minlength: [5, messages.validation.todo.label.minlength(5)],
    },
    done: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  { timestamps: true }
);

todoSchema.virtual("id").get(function () {
  return this._id;
});

export const TodoSchema = model<Todo>("TodoSchema", todoSchema);
