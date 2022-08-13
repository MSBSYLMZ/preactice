import { makeSchema } from "nexus";
import QuestionSchema from "./question/question.schema";

const schema = makeSchema({
	types: [QuestionSchema],

});

export default schema;
