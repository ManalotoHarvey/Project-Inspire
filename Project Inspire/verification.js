// Validate the uploaded ID photo
const validateIdPhoto = (file) => {
  const acceptedTypes = ["image/png", "image/jpg", "image/jpeg", "image/heic", "application/pdf"];

  if (!acceptedTypes.includes(file.type)) {
    alert("Only PNG, JPG, JPEG, HEIC, and PDF files are accepted.");
    return false;
  }

  if (file.size > 5 * 1024 * 1024) {
    alert("The file size must be less than 5MB.");
    return false;
  }

  // Check if the photo is blurred or cropped
  const image = new Image();
  image.onload = () => {
    if (image.width < 300 || image.height < 200) {
      alert("The photo must be at least 300x200 pixels.");
      return false;
    }

    // Check for blurry edges
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);

    const edges = ctx.getImageData(0, 0, image.width, image.height).data;
    for (let i = 0; i < edges.length; i += 4) {
      if (edges[i] < 100 || edges[i + 1] < 100 || edges[i + 2] < 100) {
        alert("The photo appears to be blurred or cropped.");
        return false;
      }
    }

    // The photo is valid
    return true;
  };

  image.src = URL.createObjectURL(file);
};

// Validate the uploaded selfie
const validateSelfie = (file) => {
  const acceptedTypes = ["image/png", "image/jpg", "image/jpeg", "image/heic"];

  if (!acceptedTypes.includes(file.type)) {
    alert("Only PNG, JPG, JPEG, and HEIC files are accepted.");
    return false;
  }

  if (file.size > 5 * 1024 * 1024) {
    alert("The file size must be less than 5MB.");
    return false;
  }

  // Check if the selfie is clear and shows your face
  const image = new Image();
  image.onload = () => {
    if (image.width < 300 || image.height < 200) {
      alert("The selfie must be at least 300x200 pixels.");
      return false;
    }

   

    // The selfie is valid
    return true;
  };

  image.src = URL.createObjectURL(file);
};

// Validate the ID type
const validateIdType = (idType) => {
  if (idType === "") {
    alert("Please select an ID type.");
    return false;
  }

  // TODO: Implement additional validation based on ID type (e.g., driver's license, passport, national ID)

  return true;
};
