import { NextApiRequest, NextApiResponse } from "next";

import connectDb from "../../../config/db";

import { register } from "../../../controllers/authController";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
      await connectDb();

      if (req.method === "POST") {
            return register(req, res);
      } else {
            res.status(405).json({ message: "Method not allowed." });
      }
}
