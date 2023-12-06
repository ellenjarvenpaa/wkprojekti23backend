import { addMedia } from "../models/media-model.mjs";

const postMedia = async (req, res) => {
  const { filename, size, mimetype } = req.file;
  const { title, description, user_id } = req.body;
  if (filename && title && user_id) {
    const result = await addMedia({
      filename,
      size,
      mimetype,
      title,
      description,
      user_id,
    });
    if (result.media_id) {
      res.status(201);
      res.json({ message: "New media item added.", ...result });
    } else {
      res.status(500);
      res.json(result);
    }
  } else {
    res.sendStatus(400);
  }
};

export { postMedia };
