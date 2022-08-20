import React from 'react'

interface iVideo {
    url: string
}

function Video({ url }: iVideo) {

    return (
        <div>
            <video autoPlay muted loop>
                <source src={`/assets/videos/${url}.mp4`} type='video/mp4' />
            </video>
        </div>
    )
}

export default Video