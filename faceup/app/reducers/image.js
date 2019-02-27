const TAKE_IMAGE = 'TAKE_IMAGE';
const GET_IMAGES = 'GET_IMAGES';

export default (images = [], action) => {
  let imagesCopy = [...images];

  switch (action.type) {
    case TAKE_IMAGE:
      imagesCopy.push({
        imageUrl: action.imageUrl,
        imageName: action.imageName,
        imageAge: action.imageAge,
        imageGender: action.imageGender,
      });
      return imagesCopy;
    case GET_IMAGES:
      const result = action.images;
      for (const image of result) {
        imagesCopy.push(image);
      }
      return imagesCopy;
    default:
      return images;
  }
};
