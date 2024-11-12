'use server'

import { UTApi } from "uploadthing/server";
import { db } from "@/db/index";

const utapi = new UTApi();

export async function deleteAd(adUserId: string) {
  try {
    // Először lekérjük az összes képet
    const images = await db.image.findMany({
      where: {
        userId: adUserId
      }
    });

    // Töröljük a képeket az UploadThing-ből
    for (const image of images) {
      const fileKey = image.url.split('/').pop();
      if (fileKey) {
        await utapi.deleteFiles([fileKey]);
      }
    }

    // Töröljük a képeket az adatbázisból
    await db.image.deleteMany({
      where: {
        userId: adUserId
      }
    });

    // Először megkeressük a hirdetést
    const ad = await db.ad.findFirst({
      where: { userId: adUserId }
    });

    if (!ad) return { success: false };

    await db.ad.delete({
      where: {
        id: ad.id
      }
    });

    return { success: true };
  } catch (error) {
    console.error('Hiba a törlés során:', error);
    return { success: false };
  }
} 