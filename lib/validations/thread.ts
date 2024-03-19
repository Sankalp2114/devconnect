import * as z from "zod";

export const ThreadValidation = z.object({
  thread: z
    .string()
    .min(3, { message: "length is too short to upload minimum 3 characters" }),
  accountId: z.string(),
});

export const CommentValidation = z.object({
  thread: z.string().min(1, { message: "comment cannot be empty" }),
});
