import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UploadStatus } from "@prisma/client";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const { getUser } = getKindeServerSession()
      const user = await getUser()

      if (!user || !user.id) throw new Error("Unauthorized")

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const isFileExist = await db.image.findFirst({
        where: {
          key: file.key
        }
      })

      if (isFileExist) return

      const createdImage = await db.image.create({
        data: {
          key: file.key,
          name: file.name,
          userId: metadata.userId,
          url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
          uploadStatus: 'PROCESSING'
        }
      })

    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
