import { useState } from 'react'
import './App.css'

function App() {
  const [url, setUrl] = useState('');
  const [download, setDownload] = useState(0);
  const [videoUrl, setVideoUrl] = useState(0);
  const [musicUrl, setMusicUrl] = useState(0);
  const [videoSrc, setVideoSrc] = useState(0);


  const base_url = 'https://api.tiklydown.eu.org/api'

  const submitDownload = (e) => {
    setDownload(1);
    e.preventDefault();
    fetch(`${base_url}/download/v3?url=${encodeURIComponent(url)}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.status == 200) {
        const result = data.result;
        setVideoUrl(result.video);
        setMusicUrl(result.music);
        setVideoSrc(result.video);

        setDownload(0);
      }else{
        alert('Failed to fatch download link. Please check the URL and try again')
      }
    })
  }

  return (
    <>
      <div className="flex justify-center mx-auto mt-4">
        <div className="overlay w-full">
          <div className="container">
            <h1 className="text-3xl lg:text-4xl font-bold text-center mb-8">Tiktok Downloader</h1>
            <div className="max-w-xl mx-auto">
              <form action="" id="download-form" className="space-y-4" onSubmit={(e) => submitDownload(e)}>
                <div>
                  {/* <label htmlFor="url" className="block text-sm font-semibold text-gray-700">
                    Tiktok Url
                  </label> */}
                  <input type="url" value={url} id='url' name='url' required className='mt-1 block w-full p-2 border rounded ${error ?  border-gray-300 rounded' onChange={(e) => setUrl(e.target.value)} placeholder='Masukan Tiktok Url'/>
                </div>
                <div className='flex justify-between items-center transition-all'>
                <button
                    type="submit"
                    className="button-style hover:shadow-lg hover:bg-[#2c74b3] flex items-center justify-center"
                    disabled={download}
                  >
                    {download ? (
                      <>
                        <div className="spinner mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      'Download'
                    )}
                  </button>
                </div>
              </form>

              {!download && videoUrl.length >1 ? (
                <div id='result' className='mt-5'>
                  <h2 className='text-2xl font-bold mb-4'>Hasil...</h2>
                  <div className='flex gap-2'>
                    <a href={videoUrl} className="button-style hover:shadow-lg hover:bg-[#2c74b3] py-2 px-4 rounded text-white mb-2" target='_blank' id='video-link'>
                      Download video
                    </a>
                    <a href={musicUrl} className="button-style hover:shadow-lg hover:bg-[#2c74b3] py-2 px-4 rounded text-white mb-2" target='_blank' id='music-link'>
                      Download music
                    </a>
                  </div>
                  <video src={videoSrc} id='video-result' type="video/mp4" controls className='video-result mt-5 mb-4'></video>
                </div>
              ): (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
