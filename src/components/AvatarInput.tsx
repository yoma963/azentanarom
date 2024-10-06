'use client'
import React, { useState } from 'react'
import { Button, buttonVariants } from './ui/button'
import { OurFileRouter } from "../app/api/uploadthing/core";

import { UploadButton } from "@/utils/uploadthing";
import { toast } from 'react-toastify';
import { trpc } from '@/app/_trpc/client';

export function AvatarInput() {

  const {} = trpc.getImg.useMutation({
    onSuccess: () => {
      
    },
    retry: true,
    retryDelay: 500
  })

  return (
    <div>
      <img
        src="https://tecdn.b-cdn.net/img/new/avatars/5.webp"
        className="mx-auto mb-4 w-32 rounded-lg"
        alt="Avatar" />
      <UploadButton
        content={{
          button() {
            return 'Kép feltöltése'
          },
          allowedContent({ fileTypes }) {
            return ''
          },
        }}
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("hali");
          toast.success("Feltöltés befejeződött", {
            position: "top-center",
            autoClose: 3000,
            theme: "light",
            pauseOnHover: false,
          })

          const [fileResponse] = res

          const key = fileResponse?.key

          if (!key) {
            toast.error("Nem sikerült a feltöltés", {
              position: "top-center",
              autoClose: 3000,
              theme: "light",
              pauseOnHover: false,
            })
          }


        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          toast.error("Nem sikerült a feltöltés", {
            position: "top-center",
            autoClose: 3000,
            theme: "light",
            pauseOnHover: false,

          })
        }}
      />
    </div>

  );
}