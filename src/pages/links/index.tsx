import React from "react"
import { Comments } from "@saber2pr/rc-gitment"

import "./style.less"
import { API, request } from "../../request"
import { origin } from "../../config"
import { PreImg, LazyCom, Loading } from "../../components"
import { Icon } from "../../iconfont"

type Link = {
  name: string
  href: string
}

type MessLink = Link & {
  message: string
  icon: string
}

export interface Links {
  owns: MessLink[]
  friends: Link[]
}

const PreImage = (
  <div
    style={{
      width: "3rem",
      height: "3rem",
      backgroundColor: "lightgrey",
      margin: "0 auto",
      marginRight: "0.5rem",
      borderRadius: '0.5rem'
    }}
  />
)

const OwnLinks = ({ links }: { links: MessLink[] }) => (
  <dl className="Links-Own">
    <dt className="Links-Own-Title">
      <strong>我的</strong>
      <div className="Links-Own-Title-Tip">
        <span>你找我嘛！(／≧ω＼)</span>
      </div>
    </dt>
    <dd className="Links-Own-Content">
      {links.map(({ name, href, message, icon }) => (
        <a
          key={name}
          className="Links-Own-Content-Link"
          href={href}
          target="_blank"
        >
          <table>
            <tbody>
              <tr>
                <td>
                  <PreImg
                    className="Links-Friend-Content-Link-Head"
                    fallback={PreImage}
                    src={icon}
                  />
                </td>
                <td>
                  <p>
                    <strong>{name}</strong>
                  </p>
                  <p className="Links-Own-Content-Link-Message">{message}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </a>
      ))}
    </dd>
  </dl>
)

const FriendLinks = ({ links }: { links: Link[] }) => (
  <dl className="Links-Friend">
    <dt className="Links-Friend-Title">
      <strong>友链</strong>
      <div className="Links-Friend-Title-Tip">来和妖梦玩吧qwq！</div>
    </dt>
    <dd className="Links-Friend-Content">
      {links.map(({ name, href }) => (
        <a
          className="Links-Friend-Content-Link"
          href={href}
          key={name}
          target="_blank"
        >
          <table>
            <tbody>
              <tr>
                <td>
                  <PreImg
                    className="Links-Friend-Content-Link-Head"
                    fallback={<Icon.Head />}
                    src={API.createAvatars(name)}
                  />
                </td>
                <td>
                  <p>
                    <strong>{name}</strong>
                  </p>
                  <p className="Links-Friend-Content-Link-Message">{href}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </a>
      ))}
    </dd>
  </dl>
)

export const Links = ({ owns, friends }: Links) => (
  <div className="Links">
    <OwnLinks links={owns} />
    <FriendLinks links={friends} />
    <hr />
    <Comments {...origin as any} repo={origin.commentRepo} />
    <footer>Copyright © 2019 saber2pr.</footer>
  </div>
)

export const LinksLazy = () => (
  <LazyCom await={request("links")} fallback={<Loading />}>
    {JLinks => <Links {...JLinks} />}
  </LazyCom>
)
