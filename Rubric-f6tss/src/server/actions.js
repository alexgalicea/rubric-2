import HttpError from '@wasp/core/HttpError.js'

export const createRubric = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const rubric = await context.entities.Rubric.create({
    data: {
      title: args.title,
      user: { connect: { id: context.user.id } }
    }
  });

  return rubric;
}

export const createQuestion = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const { text, grade, comments, rubricId } = args;

  const question = await context.entities.Question.create({
    data: {
      text,
      grade,
      comments,
      rubric: { connect: { id: rubricId } }
    }
  });

  return question;
}

export const sendRubric = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const rubric = await context.entities.Rubric.findUnique({
    where: { id: args.rubricId }
  });

  if (!rubric) { throw new HttpError(404) }

  // Send email logic here

  return "Rubric sent successfully";
}