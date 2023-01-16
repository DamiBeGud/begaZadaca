import React from 'react'

function DownloadPopUp({downloadInfo}) {
    const[url, name] = downloadInfo
  return (
    <div>

    <div>DownloadPopUp</div>
    <a href={url} download={name}>Download</a>
    </div>
  )
}

export default DownloadPopUp