import React from "react"
import Audio from "@saber2pr/rc-audio"

import { TwoSide } from "../../components"
import { useIsMob } from "../../hooks"
import "./style.less"
import { store } from "../../store"

type audio = {
  info: string
  src: string
  name: string
}

export interface About {
  projects: Array<{ name: string; href: string; content: string }>
  about: {
    contents: string[]
    audio: audio
  }
}

const Foot = () => (
  <>
    <p className="About-Main-Repo">
      <a href="https://github.com/Saber2pr/saber2pr.github.io">
        saber2pr.github.io
      </a>
    </p>
    <footer>Copyright © 2019 saber2pr.</footer>
  </>
)

const Main = ({ contents, audio }: { contents: string[]; audio: audio }) => {
  return (
    <>
      <h1 className="About-Main-Title">魂魄妖梦al</h1>
      <div className="About-Main-Content">
        <ul>
          {contents.map(a => (
            <li key={a}>
              <p>{a}</p>
            </li>
          ))}
        </ul>
        {audio.info}
        <Audio
          src={audio.src}
          autoplay={store.getState().music}
          start={store.getState().musicCurrent}
          onChange={(statu, audio) => {
            store.dispatch("musicCurrent", audio.currentTime)
            store.dispatch("music", statu === "playing")
          }}
        />
      </div>
    </>
  )
}

export const About = ({ about: { contents, audio }, projects }: About) => {
  const isMob = useIsMob()
  return (
    <div className="About">
      <TwoSide>
        <section className="About-Main">
          <Main contents={contents} audio={audio} />
          {isMob || <Foot />}
        </section>
        <aside className="About-Aside">
          <h2 className="About-Aside-Title">Projects</h2>
          <ul className="About-Aside-Content">
            {projects.map(({ name, href, content }) => (
              <li key={name} className="About-Aside-Content-Proj">
                <a href={href}>{name}</a>
                <p>{content}</p>
              </li>
            ))}
          </ul>
          {isMob && <Foot />}
        </aside>
      </TwoSide>
    </div>
  )
}
