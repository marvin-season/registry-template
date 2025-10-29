import z from "zod";
export const gitCommitLogSchema = z.array(
      z.object({
        hash: z.number(),
        date: z.string(),
        author_name: z.string(),
        message: z.string(),
      }),
    )
    .optional()

export type TGitCommitLog = z.infer<typeof gitCommitLogSchema>;