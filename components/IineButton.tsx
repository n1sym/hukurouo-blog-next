import { useState } from 'react'

export function IineButton({webhook_url, title}:{webhook_url: string, title: string}) {
  const [isDisplay, setIsDisplay] = useState(false)

  function postIine(title: string) {
    const url = webhook_url
    const data = {"username":"blog", "content": title + "がいいねされました"}
    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data),
    }).catch(error => console.error(error));
    toggleDisplay()
  }
  function toggleDisplay() {
    setIsDisplay(!isDisplay)
  }
  return (
    <>
      <button className="bg-transparent text-blue-700 border py-1 px-4 ml-4 mr-2 rounded-full hover:bg-gray-100" disabled={isDisplay ? true : false } onClick={() => postIine(title)}>
        👍
      </button>
      <span className="input-group" style={{ display: isDisplay ? '' : 'none' }}> {"<"} thank you ! </span>
    </>
  )
}