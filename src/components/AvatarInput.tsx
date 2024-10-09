'use client'
import React, { useState } from 'react'

import { UploadButton } from "@/utils/uploadthing";
import { toast } from 'react-toastify';

export function AvatarInput() {

  const [avatar_url, setAvatarUrl] = useState<string | undefined>("https://tecdn.b-cdn.net/img/new/avatars/5.webp")

  return (
    <div>
      <img
        src={avatar_url}
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

          setAvatarUrl(fileResponse.url)


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

export default AvatarInput