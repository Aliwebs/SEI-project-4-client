import React, { useState } from 'react'
const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
const backgroundUploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET_BACKGROUND
const profileUploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET_PROFILE

function ImageUpload({ onUpload, isProfileImg, isPost }) {
  const [imageSource, setImageSource] = useState(null)
  let uploadPreset = backgroundUploadPreset
  if (isProfileImg) {
    uploadPreset = profileUploadPreset
  }
  function handleUpload() {
    window.cloudinary
      .createUploadWidget(
        {
          cloudName: uploadUrl,
          uploadPreset,
          sources: ['local'],
          multiple: false,
        },
        (err, result) => {
          if (err) console.log(err)
          if (result.event === 'success') {
            setImageSource(result.info.url)
            onUpload(result.info.url)
          }
        }
      )
      .open()
  }
  return (
    <>
      {isPost && imageSource && <img width="400px" src={imageSource} />}
      <button onClick={handleUpload} type="button" className={isProfileImg ? 'profile-edit' : 'btn-grey'}>{
        isPost ? !imageSource ? 'Add image' : 'Change Image' :
          !isProfileImg ? 'Change Background Image' :
            'Edit'}</button>
    </>
  )
}

export default ImageUpload