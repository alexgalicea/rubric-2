import HttpError from '@wasp/core/HttpError.js'

export const getRubrics = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Rubric.findMany({
    where: {
      user: { id: context.user.id }
    }
  });
}

export const getRubric = async ({ rubricId }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const rubric = await context.entities.Rubric.findUnique({
    where: { id: rubricId },
    include: { questions: true }
  });

  if (!rubric) throw new HttpError(404, 'No rubric with id ' + rubricId);

  return rubric;
}