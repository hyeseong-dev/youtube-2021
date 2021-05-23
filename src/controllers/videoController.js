import Video from "../models/video"

// export const home = (req, res) => {
//   console.log("Start");
//   Video.find({}, (error, videos) => {
//     console.log("Finished");
//     console.log('errors',error)
//     console.log('videos',videos)
//     return res.render("home", { pageTitle: "Home", videos });
//   });
//   console.log("I finish first")
// };
export const home = async (req, res) => {
  const videos = await Video.find({});  
  return res.render("home", { pageTitle: "Home", videos });
}


export const watch = (req, res) => {
  const { id } = req.params;
  return res.render("watch", { pageTitle: `Watching` });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  return res.render("edit", { pageTitle: `Editing` });
};
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  return res.redirect(`/videos/${id}`)
};

export const getUpload = (req, res) => {
  return res.render("upload", {pageTitle: "Upload Video"});
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title: title,
      description: description,
      createdAt: Date.now(),
      hashtags: hashtags.split(",").map((word) => `#${word}`),
    });
    return res.redirect('/')
  }catch (error) {
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
}