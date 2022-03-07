import React, { useState, useRef } from "react";
import { Popover } from '@headlessui/react'
import notifyIcon from "../../assets/icons/icon-notification.svg";

const Notifications = () => {

    const lists = [
        {
            name: 'Insights',
            active: true,
            href: '##',
        },
        {
            name: 'Automations',
            active: false,
            href: '##',
        },
        {
            name: 'Reports',
            active: false,
            href: '##',
        },
    ]

    return (
        <Popover className="popover" style={{ marginTop: 4, marginRight: 20 }}>
            <Popover.Button as="div">
                <span className="popover-notification">
                    <img src={notifyIcon} />
                    <span className="popover-notification-badge"></span>
                </span>

            </Popover.Button>
            <Popover.Panel className="popover-panel">
                <h4 style={{ marginLeft: "15px", marginTop: "15px" }}>NOTIFICATIONS</h4>
                <div className="popover-grid">
                    <ul>
                        {lists.map((item, index) => (
                            <div key={"notification" + index}>
                                <li style={item.active ? { color: "rgb(20, 248, 20)", } : {}}>
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        style={{ color: "black" }}
                                    >
                                        {item.name}
                                    </a>
                                </li>

                                {lists[lists.length - 1] !== item && <hr style={{ transform: "translateX(-4%)" }}></hr>}
                            </div>

                        ))}
                    </ul>

                </div>
            </Popover.Panel>
        </Popover>
    );

    // const lists = [
    //     {
    //         name: 'Insights',
    //         active: true,
    //         href: '##',
    //     },
    //     {
    //         name: 'Automations',
    //         active: false,
    //         href: '##',
    //     },
    //     {
    //         name: 'Reports',
    //         active: false,
    //         href: '##',
    //     },
    // ]


    // return (
    //     <Popover className="popover" style={{ marginTop: 4, marginRight: 20 }}>
    //         <Popover.Button as="div">
    //             <span className="popover-notification">
    //                 <img src={notifyIcon} />
    //                 <span className="popover-notification-badge"></span>
    //             </span>

    //         </Popover.Button>
    //         <Popover.Panel className="popover-panel">
    //             <h4 style={{ marginLeft: "15px", marginTop: "15px" }}>NOTIFICATIONS</h4>
    //             <div className="popover-grid">
    //                 <ul>
    //                     {lists.map((item, index) => (
    //                         <div key={"notification" + index}>
    //                             <li style={item.active ? { color: "rgb(20, 248, 20)", } : {}}>
    //                                 <a
    //                                     key={item.name}
    //                                     href={item.href}
    //                                     style={{ color: "white" }}
    //                                 >
    //                                     {item.name}
    //                                 </a>
    //                             </li>

    //                             {lists[lists.length - 1] !== item && <hr style={{ transform: "translateX(-4%)" }}></hr>}
    //                         </div>

    //                     ))}
    //                 </ul>

    //             </div>
    //         </Popover.Panel>
    //     </Popover>
    // )
}


export default Notifications