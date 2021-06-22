import React from 'react'
const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
const backgroundUploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET_BACKGROUND
const profileUploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET_PROFILE

function ImageUpload({ onUpload, isProfileImg }) {
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
            onUpload(result.info.url)
          }
        }
      )
      .open()
  }
  return (
    <>
      <button onClick={handleUpload} type="button" className={isProfileImg ? 'profile-edit' : 'btn-grey'}>{!isProfileImg ? 'Change Background Image' : 'Edit'}</button>
    </>
  )
}

export default ImageUpload