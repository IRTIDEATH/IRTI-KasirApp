import type { NextApiRequest, NextApiResponse } from "next";
import { signUp } from "@/lib/firebase/service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // req.methode harus sama dengan post dan tidak boleh lewat get. karena nanti akan mengirim data
  if (req.method === "POST") {
    await signUp(
      // apapun yang ada di formnya kita kirimkan
      req.body,
      // menerima callback, callbacknya akan ngirim status
      (status: boolean) => {
        if (status) {
          res
            .status(200)
            .json({ status: true, statusCode: 200, message: "success" });
            console.log('berhasil');
        } else {
          res
            .status(400)
            .json({ status: false, statusCode: 400, message: "failed" });
            console.log('gagal');
        }
      }
    );
  } else {
    res
      .status(405)
      .json({ status: false, statusCode: 405, message: "Methode Not Allowed" });
  }
}
