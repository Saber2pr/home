import React from "react";
import Audio from "@saber2pr/rc-audio";

import { TwoSide } from "../../components";
import { useIsMob } from "../../hooks";
import "./style.less";

export interface About {
  projects: Array<{ name: string; href: string; content: string }>;
  about: {
    contents: string[];
    audio: string;
  };
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
);

const Main = ({ contents, audio }: { contents: string[]; audio: string }) => {
  return (
    <>
      <h1 className="About-Main-Title">saber2pr</h1>
      <div className="About-Main-Content">
        <ul>
          {contents.map(a => (
            <li key={a}>
              <p>{a}</p>
            </li>
          ))}
        </ul>
        常听纯音乐>>
        <Audio src={audio} />
      </div>
    </>
  );
};

export const About = ({ about: { contents, audio }, projects }: About) => {
  const isMob = useIsMob();
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
  );
};
