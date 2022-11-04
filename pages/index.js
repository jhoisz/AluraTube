import config from '../config.json'
import styled from 'styled-components'
import { CSSReset } from '../src/components/CSSReset'
import Menu from '../src/components/Menu'
import { StyledTimeline } from '../src/components/Timeline'
import React from 'react'

function HomePage() {
    const [valorDoFiltro, setValorDoFiltro] = React.useState("")

    return (
        <>
            <CSSReset />
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}>
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro}></Menu>
                <Header />
                <TimeLine
                    searchValue={valorDoFiltro}
                    playlists={config.playlists} >

                </TimeLine>
            </div>
        </>

    )
}

export default HomePage



const StyledHeader = styled.div`
    img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;


const StyledBanner = styled.div`
    background-image: url(${({ bg }) => bg});
    height: 230px;
`;


function Header() {
    return (
        <StyledHeader>
            <StyledBanner bg={config.bg}></StyledBanner>

            <section className='user-info'>
                <img src={`https://github.com/${config.github}.png`} />

                <div>
                    <h2>{config.name}</h2>
                    <p>{config.description}</p>
                </div>
            </section>

        </StyledHeader>
    )
}

function TimeLine({ searchValue, ...props }) {
    const playlistsNames = Object.keys(props.playlists)

    return (
        <StyledTimeline>
            {
                playlistsNames.map((playlistsName) => {
                    const videos = props.playlists[playlistsName]
                    return (
                        <section key={playlistsName}>
                            <h2>{playlistsName}</h2>
                            <div>
                                {
                                    videos.filter((video) => {
                                        const titleNormalized = video.title.toLowerCase()
                                        const searchValueNormalized = searchValue.toLowerCase()
                                        return titleNormalized.includes(searchValueNormalized)
                                    }).map((video) => {
                                        return (
                                            <a key={video.url} href={video.url}>
                                                <img src={video.thumb} />
                                                <span>{video.title}</span>
                                            </a>
                                        )
                                    }
                                    )
                                }
                            </div>
                        </section>
                    )
                })}
        </StyledTimeline>
    )
}