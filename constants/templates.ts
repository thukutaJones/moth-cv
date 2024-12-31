import axios from "axios";
import { baseUrl } from "./baseUrl";
import { getUserIdFromCookie } from "./getUserId";

const Templates = async () => {
  try {
    const userId = await getUserIdFromCookie();
    const res = await axios.get(`${baseUrl}/api/cv-details/${userId}`);
    console.log(res?.data?.details[0]);
    const {
      personalDetails,
      education,
      references,
      skills,
      workExperience,
      proffessinalSummary,
    } = res?.data?.details;
    console.log(personalDetails);

    const template_6 = `
    <!DOCTYPE html>
    <head>
        <style>
            
           @page {
                margin-left: 40px;
                margin-right: 40px;
                margin-top: 30px;
                margin-bottom: 40px;
            }
            
            .text {
                font-size: 11pt;
                font-family: Arial;
            }

            .hr {
                background-color: black;
                height: 1pt;
                margin-top: 0pt;
            }
            .subHeading {
                font-size: 13pt;
                font-family: Arial;
            }

            #skills {
                margin-left: 15pt;
                padding-left: 0;
                line-height: 1.2;
            }
            .avoid-page-break {
                page-break-inside: avoid;
            }
        </style>
    </head>
    <html>        
        <body>
            ${
              personalDetails
                ? `
                        <div style="line-height: 1.2;">
                            <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center;">
                                <div>
                                    ${
                                      personalDetails?.fullName
                                        ? `<h1 style="font-size: 25pt; font-family: Arial; font-weight: 800;">
                                                ${personalDetails.fullName}
                                                
                                            </h1>`
                                        : ""
                                    }
                                </div>
                                ${
                                  personalDetails?.pic
                                    ? `
                                            <img src="${personalDetails?.pic}" height="120px" width="120px" style="border-radius: 100%; margin-left: 10pt;" />
                                        `
                                    : ""
                                }
                            </div>
                            <div style="margin-top: -10pt; line-height: 1.2;">
                                ${
                                  personalDetails?.email
                                    ? `<div style="display: flex; flex-direction: row; align-items: center; flex-start;">
                                            <div style="width: 20%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                                                <p class="text" style="font-weight: 800;">E-mail</p>
                                                <p style="margin-right: 20px;">:</p>
                                            </div>
                                            <p class="text">${personalDetails.email}</p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails?.phone
                                    ? `<div style="display: flex; flex-direction: row; align-items: center; flex-start; margin-top: -20pt;">
                                            <div style="width: 20%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                                                <p class="text" style="font-weight: 800;">Cellphone</p>
                                                <p style="margin-right: 20px;">:</p>
                                            </div>
                                            <p class="text">${personalDetails?.phone}</p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails?.address
                                    ? `<div style="display: flex; flex-direction: row; align-items: center; flex-start; margin-top: -20pt;">
                                            <div style="width: 20%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                                                <p class="text" style="font-weight: 800;">Address</p>
                                                <p style="margin-right: 20px;">:</p>
                                            </div>
                                            <p class="text">${personalDetails?.address}</p>
                                        </div>`
                                    : ""
                                } 
                               ${
                                 personalDetails?.nationality
                                   ? `<div style="display: flex; flex-direction: row; align-items: center; flex-start; margin-top: -20pt;">
                                            <div style="width: 20%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                                                <p class="text" style="font-weight: 800;">Nationality</p>
                                                <p style="margin-right: 20px;">:</p>
                                            </div>
                                            <p class="text">${personalDetails?.nationality}</p>
                                        </div>`
                                   : ""
                               }
                            </div>
                        </div>
                    `
                : ""
            }
            ${
              proffessinalSummary
                ? `<div style="margin-top: 10pt;">
                        <h2 class="subHeading">
                            <b>OBJECTIVE</b>
                            <hr class="hr">
                        </h2>
                        <p class="text" style="margin-top: -5pt; line-height: 1.2;">
                            ${proffessinalSummary}
                        </p>
                    </div>`
                : ""
            }
            ${
              skills?.length
                ? `<div style="margin-top: 20pt;">
                        <div class="avoid-page-break"><h2 class="subHeading">
                            <b>SKILLS</b>
                            <hr class="hr">
                        </h2></div>
                        <ul id="skills" style="margin-top: -5pt;">
                            ${skills
                              ?.map(
                                (skill: string) =>
                                  `<div class="avoid-page-break">
                                        <li class="text" style="margin-top: 5pt;">${skill}</li>
                                    </div>`
                              )
                              .join("")}
                        </ul>
                    </div>`
                : ""
            }
            ${
              education?.length
                ? `<div style="margin-top: 20pt;">
                        <div class="avoid-page-break"><h2 class="subHeading">
                            <b>EDUCATION</b>
                            <hr class="hr">
                        </h2></div>
                        ${education
                          ?.map(
                            (educationDetail: any) =>
                              `<div style="margin-top: -5pt; line-height: 1.1;">
                                    <div class="avoid-page-break"><p class="text">
                                        <b>${educationDetail?.degree}</b>
                                    </p></div>
                                    <div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: -20pt;">
                                        <div class="avoid-page-break"><p class="text">${
                                          educationDetail?.school
                                        }</p></div>
                                        <div class="avoid-page-break">
                                            <p class="text">(${new Date(
                                              educationDetail?.startDate
                                            )
                                              ?.toDateString()
                                              ?.slice(4)} to ${new Date(
                                educationDetail?.endDate
                              )
                                ?.toDateString()
                                ?.slice(4)})</p>
                                        </div>
                                    </div>
                                </div>`
                          )
                          .join("")}
                    </div>`
                : ""
            }
            ${
              workExperience?.length
                ? `<div style="margin-top: 0pt;">
                        <div class="avoid-page-break"><h2 class="subHeading">
                            <b>WORK EXPERIENCE</b>
                            <hr class="hr">
                        </h2></div>
                        ${workExperience
                          ?.map(
                            (workDetail: any) =>
                              `
                                <div class="avoid-page-break"><p class="text">
                                    <b>${workDetail?.jobTitle?.toUpperCase()}</b>
                                </p></div>
                                <div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: -20pt;">
                                    <div class="avoid-page-break">
                                        <p class="text">${
                                          workDetail?.company
                                        }</p>
                                    </div>
                                    <div class="avoid-page-break">
                                        <p class="text">(${new Date(
                                          workDetail?.startDate
                                        )
                                          ?.toDateString()
                                          ?.slice(4)} to ${new Date(
                                workDetail?.endDate
                              )
                                ?.toDateString()
                                ?.slice(4)})</p>
                                    </div>
                                </div>
                                <div style="margin-top: -15pt; line-height: 0.5; margin-bottom: 25pt;">
                                    <div class="avoid-page-break"><p><b>Description:</b></p></div>
                                        ${
                                          workDetail?.jobDescription
                                            ? workDetail?.jobDescription
                                                ?.split("\n")
                                                ?.map(
                                                  (detail: any) =>
                                                    `<div class="avoid-page-break"><p class="text">${detail}</p></div>`
                                                )
                                                .join("")
                                            : ""
                                        }
                                </div>
                                `
                          )
                          .join("")}
                    </div>`
                : ""
            }
            ${
              references?.length
                ? `<h2 class="subHeading">
                        <b>REFERENCES</b>
                    <hr class="hr">
                    </h2>
                    ${references
                      ?.map(
                        (reference: any) =>
                          `<div>
                                ${
                                  reference?.name
                                    ? `<p class="text">${reference.name}</p>`
                                    : ""
                                }
                                ${
                                  reference?.company
                                    ? `<p style="margin-top: -10pt;" class="text">${reference?.company}</p>`
                                    : ""
                                }
                                ${
                                  reference?.address
                                    ? reference?.address
                                        ?.split(",")
                                        ?.map(
                                          (line: any) =>
                                            `<p style="margin-top: -10pt;" class="text">${line}</p>`
                                        )
                                        .join("")
                                    : ""
                                }
                                <div style="margin-top: -5pt;" style="margin-bottom: 5pt;">
                                    ${
                                      reference?.email
                                        ? `<p class="text">E-mail: ${reference?.email}</p>`
                                        : ""
                                    }
                                    ${
                                      reference?.phone
                                        ? `<p style="margin-top: -10pt;" class="text">CELL: ${reference?.phone}</p>`
                                        : ""
                                    }
                                </div>
                            </div>`
                      )
                      .join("")}
                `
                : ""
            }
        </body>
    </html>

    `;

    const template_3 = `
        <!DOCTYPE html>
        <head>
            <style>
                body {
                    padding: 0;
                    margin: 0;
                }
                @page {
                    margin-top: 40px;
                    margin-bottom: 30px;
                }
                @page:first {
                    margin-top: 0px;
                }   
                .bg {
                    background-color: #FCA049;
                    font-family: Helvetica;
                    font-size: 15pt;
                }
                .text {
                    font-family: Helvetica;
                    font-size: 12pt;
                }
                
                #skills {
                    margin-left: 13pt;
                    padding-left: 0;
                    line-height: 1.1;
                }
            </style>
        </head>
        <html>
            <body>
                ${
                  personalDetails?.email || personalDetails?.phone
                    ? `
                            <div style="width: 100%; height: 50px;" class="bg">
                                <div style="display: flex; flex-direction: row; justify-content: space-between; width:90%; margin-left: 5%; margin-right: 5%">
                                    ${
                                      personalDetails?.phone
                                        ? `<div style="display: flex; flex-direction: row;  align-items: center;">
                                                <p style="font-size: 10pt; font-weight: 800; font-family: Arial;">${personalDetails?.phone}</p>
                                            </div>`
                                        : ""
                                    }
                                    ${
                                      personalDetails?.email
                                        ? `<div style="display: flex; flex-direction: row;  align-items: center;">
                                                <p style="font-size: 10pt; font-weight: 800; font-family: Arial;">${personalDetails?.email}</p>
                                            </div>`
                                        : ""
                                    }
                                    
                                </div>
                            </div>
                        `
                    : ""
                }
                <div style="margin-left: 5%; margin-right: 5%">
                    <div>
                        ${
                          personalDetails?.fullName
                            ? `<h1 class="text" style="font-size: 25pt; font-weight: 800;">${personalDetails?.fullName}</h1>`
                            : ""
                        }
                    </div>
                    ${
                      proffessinalSummary || personalDetails?.pic
                        ? `<div style="display: flex; flex-direction: row; justify-content: space-between; align-items: start; margin-top: -20pt;">
                                ${
                                  proffessinalSummary
                                    ? `<p class="text" style="line-height: 1.2;">${proffessinalSummary}</p>`
                                    : ""
                                }
                                ${
                                  personalDetails?.pic
                                    ? `<img src="${personalDetails?.pic}" height="120px" width="120px" style="border-radius: 100%; margin-left: 10pt;" />`
                                    : ""
                                }
                            </div>`
                        : ""
                    }
                    <hr class="bg" style="height: 2pt; margin-top: 10pt;"/>
                </div>
                <div style="margin-left: 5%; margin-right: 5%">
                    <div style="column-fill: auto; column-count: 2; column-gap: 20px;">
                        ${
                          personalDetails?.email ||
                          personalDetails?.phoneNumber ||
                          personalDetails?.address ||
                          personalDetails?.nationality
                            ? `<div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>PERSONAL DETAILS</b></h2></div>
                                    ${
                                      personalDetails?.email
                                        ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">E-mail:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails?.email}
                                            </p>
                                        </div>`
                                        : ""
                                    }
                                ${
                                  personalDetails?.phone
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Phone Number:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails?.phone}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails?.address
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Address:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails?.address}
                                            </p>
                                        </div>`
                                    : ""
                                } 
                                    ${
                                      personalDetails?.nationality
                                        ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                        <b><p class="text" style="line-height: 1;">Nationality:</p></b> 
                                        <p style="line-height: 1; margin-left: 10pt;" class="text">
                                            ${personalDetails?.nationality}
                                        </p>
                                    </div>`
                                        : ""
                                    }
                                        `
                            : ""
                        }
                        ${
                          skills?.length
                            ? `<div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>SKILLS</b></h2></div>
                                <ul id="skills" style="margin-top: -5pt;">
                                    ${skills
                                      ?.map(
                                        (skill: any) =>
                                          `<div class="avoid-page-break">
                                                <li class="text" style="margin-top: 5pt;">${skill}</li>
                                            </div>`
                                      )
                                      .join("")}
                                </ul>
                                    `
                            : ""
                        }
                        ${
                          education?.length
                            ? `<div style="margin-top: 20pt;">
                                    <div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>EDUCATION</b></h2></div>
                                    ${education
                                      .map(
                                        (educationDetail: any) =>
                                          `<div style="margin-top: -5pt; line-height: 1.6;">
                                                <div class="avoid-page-break"><h3 class="text">
                                                    <b>${
                                                      educationDetail?.degree
                                                    }</b>
                                                </h3></div>
                                                <div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: -20pt;">
                                                    <div class="avoid-page-break">
                                                        <p class="text">${educationDetail?.school?.toUpperCase()}</p>
                                                    </div>
                                                    <div class="avoid-page-break">
                                                        <p class="text">${new Date(
                                                          educationDetail?.endDate
                                                        ).getFullYear()}</p>
                                                    </div>
                                                </div>
                                            </div>`
                                      )
                                      .join("")}
                                </div>`
                            : ""
                        }
                        ${
                          workExperience?.length
                            ? `<div style="margin-top: 0pt;">
                                    <div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>WORK HISTORY</b></h2></div>
                                    ${workExperience
                                      ?.map(
                                        (workDetail: any) =>
                                          `
                                            <div class="avoid-page-break">
                                                <p class="text" style="font-size: 12pt;"><b>${
                                                  workDetail?.jobTitle
                                                }</b> - ${new Date(
                                            workDetail?.startDate
                                          )
                                            ?.toDateString()
                                            ?.slice(4)} to ${new Date(
                                            workDetail?.endDate
                                          )
                                            ?.toDateString()
                                            ?.slice(4)}</p>
                                            </div>
                                            <div class="avoid-page-break">
                                                <p style="margin-top: -6pt;" class="text">${workDetail?.company?.toUpperCase()}</p>
                                            </div>
                                                ${
                                                  workDetail?.jobDescription
                                                    ? `<ul id="skills" style="margin-top: -2pt;">
                                                            ${workDetail?.jobDescription
                                                              ?.split("\n")
                                                              ?.map(
                                                                (
                                                                  description: any
                                                                ) =>
                                                                  `<div class="avoid-page-break">
                                                                        <li class="text" style="margin-top: 5pt;">${description?.slice(
                                                                          1
                                                                        )}</li>
                                                                    </div>`
                                                              )
                                                              .join("")}
                                                        </ul>`
                                                    : ""
                                                }
                                            `
                                      )
                                      .join("")}
                                </div>`
                            : ""
                        }
                        ${
                          references?.length
                            ? `<div class="avoid-page-break"><h2 class="bg" style="padding: 5px;">
                                    <b>REFERENCES</b>
                                </h2></div>
                                ${references
                                  .map(
                                    (reference: any) =>
                                      `<div>
                                            ${
                                              reference?.name
                                                ? `<div class="avoid-page-break"><p class="text">${
                                                    reference?.name
                                                  } ${`${
                                                    reference?.jobTitle
                                                      ? ` - ${reference?.jobTitle}`
                                                      : ""
                                                  }`}</p></div>`
                                                : ""
                                            }
                                            ${
                                              reference?.company
                                                ? `<div class="avoid-page-break"><p style="margin-top: -10pt;" class="text">${reference?.company}</p></div>`
                                                : ""
                                            }
                                            ${
                                              reference?.address
                                                ? reference?.address
                                                    ?.split(",")
                                                    ?.map(
                                                      (line: any) =>
                                                        `<div class="avoid-page-break"><p class="text" style="margin-top: -10pt;">${line}</p></div>`
                                                    )
                                                    .join("")
                                                : ""
                                            }
                                            <div style="margin-top: -5pt;" style="margin-bottom: 5pt;">
                                                ${
                                                  reference?.email
                                                    ? `<div class="avoid-page-break"><p class="text">E-mail: ${reference?.email}</p></div>`
                                                    : ""
                                                }
                                                ${
                                                  reference?.phone
                                                    ? `<div class="avoid-page-break"><p class="text" style="margin-top: -10pt;">CELL: ${reference?.phone}</p></div>`
                                                    : ""
                                                }
                                            </div>
                                        </div>`
                                  )
                                  .join("")}
                            `
                            : ""
                        }
                    </div>
                </div>
            </body>
        </html>
    `;

    const template_7 = `
    <!DOCTYPE html>
    <head>
        <style>
            
           @page {
                margin-left: 40px;
                margin-right: 40px;
                margin-top: 30px;
                margin-bottom: 40px;
            }
            
            .text {
                font-size: 11pt;
                font-family: Arial;
            }

            .hr {
                background-color: black;
                height: 1pt;
                margin-top: 0pt;
            }
            .subHeading {
                font-size: 13pt;
                font-family: Arial;
            }

            #skills {
                margin-left: 15pt;
                padding-left: 0;
                line-height: 1;
            }
            .avoid-page-break {
                page-break-inside: avoid;
            }
        </style>
    </head>
    <html>        
        <body style=">
             
            ${
              personalDetails
                ? `
                        <div style="line-height: 0;">
                            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                                    ${
                                      personalDetails?.pic
                                        ? `
                                                <img src="${personalDetails?.pic}" height="120px" width="120px" style="border-radius: 100%; align-self: center;"/>
                                            `
                                        : ""
                                    }
                                    ${
                                      personalDetails?.fullName
                                        ? `<h1 style="font-size: 25pt; font-family: Arial; font-weight: 800; text-align: center;">
                                                ${personalDetails?.fullName}
                                                
                                            </h1>`
                                        : ""
                                    }
                            </div>
                            <div style="margin-top: 10pt; line-height: 0;">
                                ${
                                  personalDetails?.email
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">E-mail:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails?.email}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails?.phone
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Phone Number:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails?.phone}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails?.address
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Address:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails?.address}
                                            </p>
                                        </div>`
                                    : ""
                                } 
                                ${
                                  personalDetails?.nationality
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Nationality:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails?.nationality}
                                            </p>
                                        </div>`
                                    : ""
                                }
                            </div>
                        </div>
                    `
                : ""
            }
            ${
              proffessinalSummary
                ? `<div style="margin-top: 10pt;">
                        <div class="avoid-page-break"><h2 class="subHeading">
                            <b>OBJECTIVE</b>
                            <hr class="hr">
                        </h2></div>
                        <div class="avoid-page-break"><p class="text" style="margin-top: -5pt;">
                            ${proffessinalSummary}
                        </p></div>
                    </div>`
                : ""
            }
            ${
              skills?.length
                ? `<div style="margin-top: 20pt;">
                        <div class="avoid-page-break"><h2 class="subHeading">
                            <b>SKILLS</b>
                            <hr class="hr">
                        </h2></div>
                        <ul id="skills" style="margin-top: -5pt;">
                            ${skills
                              ?.map(
                                (skill: any) =>
                                  `<div class="avoid-page-break">
                                        <li class="text" style="margin-top: 5pt;">${skill}</li>
                                    </div>`
                              )
                              .join("")}
                        </ul>
                    </div>`
                : ""
            }
            ${
              education?.length
                ? `<div style="margin-top: 20pt;">
                        <div class="avoid-page-break"><h2 class="subHeading">
                            <b>EDUCATION</b>
                            <hr class="hr">
                        </h2></div>
                        ${education
                          ?.map(
                            (educationDetail: any) =>
                              `<div style="margin-top: -5pt; line-height: 1;">
                                    <div class="avoid-page-break"><p class="text">
                                        <b>${educationDetail?.degree}</b>
                                    </p></div>
                                    <div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: -20pt;">
                                        <div class="avoid-page-break"><p class="text">${
                                          educationDetail?.school
                                        }</p></div>
                                        <div class="avoid-page-break">
                                            <p class="text">(${new Date(
                                              educationDetail?.startDate
                                            )
                                              ?.toDateString()
                                              ?.slice(4)} to ${new Date(
                                educationDetail?.endDate
                              )
                                ?.toDateString()
                                ?.slice(4)})</p>
                                        </div>
                                    </div>
                                </div>`
                          )
                          .join("")}
                    </div>`
                : ""
            }
            ${
              workExperience.length
                ? `<div style="margin-top: 0pt;">
                        <div class="avoid-page-break"><h2 class="subHeading">
                            <b>WORK HISTORY</b>
                            <hr class="hr">
                        </h2></div>
                        ${workExperience
                          .map(
                            (workDetail: any) =>
                              `
                                <div class="avoid-page-break"><p class="text" style="font-size: 12pt;">
                                    <b>${workDetail.jobTitle}</b>
                                </p></div>
                                <div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: -20pt;">
                                    <div class="avoid-page-break">
                                        <p class="text">${
                                          workDetail?.company
                                        }</p>
                                    </div>
                                    <div class="avoid-page-break">
                                        <p class="text">(${new Date(
                                          workDetail?.startDate
                                        )
                                          ?.toDateString()
                                          ?.slice(4)} to ${new Date(
                                workDetail?.endDate
                              )
                                ?.toDateString()
                                ?.slice(4)})</p>
                                    </div>
                                </div>
                                <div style="margin-top: -10pt; line-height: 0.5; margin-bottom: 20pt;">
                                    <div class="avoid-page-break"><p><b>Description:</b></p></div>
                                        ${
                                          workDetail?.jobDescription
                                            ? workDetail?.jobDescription
                                                ?.split("\n")
                                                ?.map(
                                                  (detail: any) =>
                                                    `<div class="avoid-page-break"><p class="text">${detail}</p></div>`
                                                )
                                                .join("")
                                            : ""
                                        }
                                </div>
                                `
                          )
                          .join("")}
                    </div>`
                : ""
            }
           
           
            ${
              references?.length
                ? `<h2 class="subHeading">
                        <b>REFERENCES</b>
                    <hr class="hr">
                    </h2>
                    ${references
                      .map(
                        (reference: any) =>
                          `<div>
                                ${
                                  reference.name
                                    ? `<p>${reference.name}</p>`
                                    : ""
                                }
                                ${
                                  reference?.company
                                    ? `<p style="margin-top: -10pt;">${reference?.company}</p>`
                                    : ""
                                }
                                ${
                                  reference?.address
                                    ? reference?.address
                                        ?.split(",")
                                        ?.map(
                                          (line: any) =>
                                            `<p style="margin-top: -10pt;">${line}</p>`
                                        )
                                        .join("")
                                    : ""
                                }
                                <div style="margin-top: -5pt;" style="margin-bottom: 5pt;">
                                    ${
                                      reference?.email
                                        ? `<p>E-mail: ${reference?.email}</p>`
                                        : ""
                                    }
                                    ${
                                      reference?.phone
                                        ? `<p style="margin-top: -10pt;">CELL: ${reference?.phone}</p>`
                                        : ""
                                    }
                                </div>
                            </div>`
                      )
                      .join("")}
                `
                : ""
            }
        </body>
    </html>

    `;

    const template_9 = `
        <!DOCTYPE html>
        <head>
            <style>
                body {
                    padding: 0;
                    margin: 0;
                }
                @page {
                    margin-top: 40px;
                    margin-bottom: 30px;
                }  
                .bg {
                    font-family: Arial;
                }
                .text {
                    font-family: Arial;
                    font-size: 11pt;
                }
                
                #skills {
                    margin-left: 13pt;
                    padding-left: 0;
                    line-height: 1;
                }
            </style>
        </head>
        <html>
            <body>
                <div style="margin-left: 5%; margin-right: 5%">
                ${
                  proffessinalSummary ||
                  personalDetails?.pic ||
                  personalDetails?.fullName
                    ? `<div style="display: flex; flex-direction: row; align-items: end; justify-content: baseline; margin-bottom: 20pt;">
                                ${
                                  personalDetails.pic
                                    ? `<img src="${personalDetails.pic}" height="400px" width="45%"/>`
                                    : ""
                                }
                                <div style="padding: 10px; background-color: rgba(0, 0, 0, 0.1); width: 100%">
                                    ${
                                      personalDetails.fullName
                                        ? `<h1 class="text" style="font-size: 25pt; font-weight: 800;">${personalDetails.fullName}</h1>`
                                        : ""
                                    }
                                    ${
                                      proffessinalSummary
                                        ? `<h2 class="bg" style="padding: 5px;">
                                            <hr style="background-color: black; height: 1pt;">
                                            <b>OBJECTIVE</b>
                                        </h2>
                                        <p class="text" style="margin-top: -10pt;">${proffessinalSummary}</p>`
                                        : ""
                                    }
                                </div>
                            </div>`
                    : ""
                }
                </div>
                <div style="margin-left: 5%; margin-right: 5%">
                    <div style="column-fill: auto; column-count: 2; column-gap: 20px;">
                        ${
                          personalDetails?.email ||
                          personalDetails?.phone ||
                          personalDetails?.address ||
                          personalDetails?.nationality
                            ? `<div class="avoid-page-break"><h2 class="bg" style="font-size: 13pt;">
                                        <hr style="background-color: black; height: 1pt;">
                                        <b>PERSONAL DETAILS</b></h2>
                                    </div>
                                    ${
                                      personalDetails?.email
                                        ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">E-mail:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails?.email}
                                            </p>
                                        </div>`
                                        : ""
                                    }
                                ${
                                  personalDetails?.phone
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Phone Number:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails.phone}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails?.address
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Address:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails?.address}
                                            </p>
                                        </div>`
                                    : ""
                                } 
                                
                                
                               ${
                                 personalDetails?.nationality
                                   ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                        <b><p class="text" style="line-height: 1;">Nationality:</p></b> 
                                        <p style="line-height: 1; margin-left: 10pt;" class="text">
                                            ${personalDetails?.nationality}
                                        </p>
                                    </div>`
                                   : ""
                               }
                                        `
                            : ""
                        }
                        ${
                          skills?.length
                            ? `<div class="avoid-page-break"><h2 class="bg">
                                    <hr style="background-color: black; height: 1pt;">
                                    <b>SKILLS</b></h2>
                                </div>
                                <ul id="skills" style="margin-top: -5pt;">
                                    ${skills
                                      ?.map(
                                        (skill: any) =>
                                          `<div class="avoid-page-break">
                                                <li class="text" style="margin-top: 5pt;">${skill}</li>
                                            </div>`
                                      )
                                      .join("")}
                                </ul>
                                    `
                            : ""
                        }
                        ${
                          education?.length
                            ? `<div style="margin-top: 20pt;">
                                    <div class="avoid-page-break"><h2 class="bg">
                                        <hr style="background-color: black; height: 1pt;">
                                        <b>EDUCATION</b>
                                    </h2></div>
                                    ${education
                                      .map(
                                        (educationDetail: any) =>
                                          `<div style="margin-top: -5pt; line-height: 1;">
                                                <div class="avoid-page-break"><h3 class="text">
                                                    <b>${
                                                      educationDetail?.degree
                                                    }</b>
                                                </h3></div>
                                                <div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: -20pt;">
                                                    <div class="avoid-page-break">
                                                        <h3 class="text">${
                                                          educationDetail?.school
                                                        }</h3>
                                                    </div>
                                                    <div class="avoid-page-break">
                                                        <h3 class="text">${new Date(
                                                          educationDetail?.endDate
                                                        )?.getFullYear()}</h3>
                                                    </div>
                                                </div>
                                            </div>`
                                      )
                                      .join("")}
                                </div>`
                            : ""
                        }
                        ${
                          workExperience.length
                            ? `<div style="margin-top: 0pt;">
                                    <div class="avoid-page-break"><h2 class="bg">
                                        <hr style="background-color: black; height: 1pt;">
                                        <b>WORK HISTORY</b>
                                    </h2></div>
                                    ${workExperience
                                      .map(
                                        (workDetail: any) =>
                                          `
                                            <div class="avoid-page-break">
                                                <h3 style="font-family: Arial; font-size: 13pt;"><b>${
                                                  workDetail?.jobTitle
                                                }</b> - ${new Date(
                                            workDetail?.startDate
                                          )
                                            ?.toDateString()
                                            ?.slice(4)} to ${new Date(
                                            workDetail?.endDate
                                          )
                                            ?.toDateString()
                                            ?.slice(4)}</h3>
                                            </div>
                                            <div class="avoid-page-break">
                                                <h3 style="font-family: Helvetica; margin-top: -10pt;"><b>${
                                                  workDetail?.company
                                                }</b></h3>
                                            </div>
                                                ${
                                                  workDetail?.jobDescription
                                                    ? `<ul id="skills" style="margin-top: -5pt;">
                                                            ${workDetail?.jobDescription
                                                              ?.split("\n")
                                                              ?.map(
                                                                (
                                                                  description: any
                                                                ) =>
                                                                  `<div class="avoid-page-break">
                                                                        <li class="text" style="margin-top: 5pt;">${description?.slice(
                                                                          1
                                                                        )}</li>
                                                                    </div>`
                                                              )
                                                              .join("")}
                                                        </ul>`
                                                    : ""
                                                }
                                            `
                                      )
                                      .join("")}
                                </div>`
                            : ""
                        }
                        
                       
                        ${
                          references?.length
                            ? `<div class="avoid-page-break"><h2 class="bg">
                                    <hr style="background-color: black; height: 1pt;">
                                    <b>REFERENCES</b>
                                </h2></div>
                                ${references
                                  ?.map(
                                    (reference: any) =>
                                      `<div>
                                            ${
                                              reference?.name
                                                ? `<div class="avoid-page-break"><p class="text">${
                                                    reference?.name
                                                  } ${`${
                                                    reference?.jobTitle
                                                      ? ` - ${reference?.jobTitle}`
                                                      : ""
                                                  }`}</p></div>`
                                                : ""
                                            }
                                            ${
                                              reference?.company
                                                ? `<div class="avoid-page-break"><p style="margin-top: -10pt;" class="text">${reference?.company}</p></div>`
                                                : ""
                                            }
                                            ${
                                              reference?.address
                                                ? reference?.address
                                                    ?.split(",")
                                                    ?.map(
                                                      (line: any) =>
                                                        `<div class="avoid-page-break"><p style="margin-top: -10pt;" class="text">${line}</p></div>`
                                                    )
                                                    .join("")
                                                : ""
                                            }
                                            <div style="margin-top: -5pt;" style="margin-bottom: 5pt;">
                                                ${
                                                  reference?.email
                                                    ? `<div class="avoid-page-break"><p class="text">E-mail: ${reference?.email}</p></div>`
                                                    : ""
                                                }
                                                ${
                                                  reference?.phone
                                                    ? `<div class="avoid-page-break"><p style="margin-top: -10pt;" class="text">CELL: ${reference?.phone}</p></div>`
                                                    : ""
                                                }
                                            </div>
                                        </div>`
                                  )
                                  .join("")}
                            `
                            : ""
                        }
                    </div>
                </div>
            </body>
        </html>
    `;

    const template_4 = `
        <!DOCTYPE html>
        <head>
            <style>
                body {
                    padding: 0;
                    margin: 0;
                }
                @page {
                    margin-top: 40px;
                    margin-bottom: 30px;
                }  
                .bg {
                    font-family: Helvetica;
                    color: rgb(27, 35, 204);
                    font-weight: 800;
                    font-size: 13pt;
                }
                .text {
                    font-family: Helvetica;
                    font-size: 12pt;
                }
                
                #skills {
                    margin-left: 13pt;
                    padding-left: 0;
                    line-height: 1;
                }
            </style>
        </head>
        <html>
            <body>
                <div style="margin-right: 5%">
                ${
                  proffessinalSummary ||
                  personalDetails?.pic ||
                  personalDetails?.fullName ||
                  personalDetails?.profession
                    ? `<div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center;"> 
                                <div style="display: flex; flex-direction: row; align-items: center;">
                                    <div style="background-color: blue; height: 40px; width: 35px;"></div>
                                    <div style="padding: 10px;">
                                        ${
                                          personalDetails?.fullName
                                            ? `<h1 class="text" style="font-size: 40pt; font-weight: 800;">${personalDetails?.fullName}</h1>`
                                            : ""
                                        }
                                        ${
                                          personalDetails?.profession
                                            ? `<h2 style="font-size: 15pt; font-family: Arial; font-weight: 800; margin-top: -30pt;">
                                                    ${personalDetails?.profession?.toUpperCase()}
                                                </h2>`
                                            : ""
                                        }
                                    </div>
                                </div>
                                ${
                                  personalDetails?.pic
                                    ? `<img src="${personalDetails?.pic}" height="120px" width="120px" style="border-radius: 100%;" />`
                                    : ""
                                }
                        </div>`
                    : ""
                }
                
                </div>
                <div style="margin-left: 5%; margin-right: 5%">
                    ${
                      proffessinalSummary
                        ? `<div style="border:groove; border-color: rgb(27, 35, 204); padding: 10px; margin-bottom: 20px;">
                                <p class="text"">${proffessinalSummary}</p>
                            </div>`
                        : ""
                    }
                    <div style="column-fill: auto; column-count: 2; column-gap: 20px;">                        
                        ${
                          personalDetails?.email ||
                          personalDetails?.phone ||
                          personalDetails?.address ||
                          personalDetails?.nationality
                            ? `<div class="avoid-page-break"><h2 class="bg">
                                        <hr style="background-color: black; height: 1pt;">
                                        <b>PERSONAL DETAILS</b></h2>
                                    </div>
                                    ${
                                      personalDetails?.email
                                        ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">E-mail:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails?.email}
                                            </p>
                                        </div>`
                                        : ""
                                    }
                                ${
                                  personalDetails?.phone
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Phone Number:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails?.phone}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails?.address
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Address:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails?.address}
                                            </p>
                                        </div>`
                                    : ""
                                } 
                                
                               ${
                                 personalDetails?.nationality
                                   ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                        <b><p class="text" style="line-height: 1;">Nationality:</p></b> 
                                        <p style="line-height: 1; margin-left: 10pt;" class="text">
                                            ${personalDetails?.nationality}
                                        </p>
                                    </div>`
                                   : ""
                               }
                                
                                        `
                            : ""
                        }
                        ${
                          skills?.length
                            ? `<div class="avoid-page-break"><h2 class="bg">
                                    <hr style="background-color: black; height: 1pt;">
                                    <b>SKILLS</b></h2>
                                </div>
                                <ul id="skills" style="margin-top: -5pt;">
                                    ${skills
                                      ?.map(
                                        (skill: any) =>
                                          `<div class="avoid-page-break">
                                                <li class="text" style="margin-top: 5pt;">${skill}</li>
                                            </div>`
                                      )
                                      .join("")}
                                </ul>
                                    `
                            : ""
                        }
                        ${
                          education?.length
                            ? `<div style="margin-top: 20pt;">
                                    <div class="avoid-page-break"><h2 class="bg">
                                        <hr style="background-color: black; height: 1pt;">
                                        <b>EDUCATION</b>
                                    </h2></div>
                                    ${education
                                      ?.map(
                                        (educationDetail: any) =>
                                          `<div style="margin-top: -5pt; line-height: 1;">
                                                <div class="avoid-page-break"><h3 class="text">
                                                    <b>${
                                                      educationDetail?.degree
                                                    }</b>
                                                </h3></div>
                                                <div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: -20pt;">
                                                    <div class="avoid-page-break">
                                                        <h3 class="text">${
                                                          educationDetail?.school
                                                        }</h3>
                                                    </div>
                                                    <div class="avoid-page-break">
                                                        <h3 class="text">${new Date(
                                                          educationDetail?.endDate
                                                        )?.getFullYear()}</h3>
                                                    </div>
                                                </div>
                                            </div>`
                                      )
                                      .join("")}
                                </div>`
                            : ""
                        }
                        ${
                          workExperience?.length
                            ? `<div style="margin-top: 0pt;">
                                    <div class="avoid-page-break"><h2 class="bg">
                                        <hr style="background-color: black; height: 1pt;">
                                        <b>WORK EXPERIENCE</b>
                                    </h2></div>
                                    ${workExperience
                                      ?.map(
                                        (workDetail: any) =>
                                          `
                                            <div class="avoid-page-break">
                                                <h3 style="font-family: Helvetica; font-size: 12pt;"><b>${
                                                  workDetail?.jobTitle
                                                }</b> - ${new Date(
                                            workDetail?.startDate
                                          )
                                            ?.toDateString()
                                            ?.slice(4)} to ${new Date(
                                            workDetail?.endDate
                                          )
                                            ?.toDateString()
                                            ?.slice(4)}</h3>
                                            </div>
                                            <div class="avoid-page-break">
                                                <h3 style="font-family: Helvetica; margin-top: -10pt; font-size: 14pt;"><b>${
                                                  workDetail?.company
                                                }</b></h3>
                                            </div>
                                                ${
                                                  workDetail?.jobDescription
                                                    ? `<ul id="skills" style="margin-top: -5pt;">
                                                            ${workDetail?.jobDescription
                                                              .split("\n")
                                                              .map(
                                                                (
                                                                  description: any
                                                                ) =>
                                                                  `<div class="avoid-page-break">
                                                                        <li class="text" style="margin-top: 5pt; line-height: 1.2;">${description?.slice(
                                                                          1
                                                                        )}</li>
                                                                    </div>`
                                                              )
                                                              .join("")}
                                                        </ul>`
                                                    : ""
                                                }
                                            `
                                      )
                                      .join("")}
                                </div>`
                            : ""
                        }
                        ${
                          references?.length
                            ? `<div class="avoid-page-break"><h2 class="bg">
                                    <hr style="background-color: black; height: 1pt;">
                                    <b>REFERENCES</b>
                                </h2></div>
                                ${references
                                  ?.map(
                                    (reference: any) =>
                                      `<div>
                                            ${
                                              reference?.name
                                                ? `<div class="avoid-page-break"><p>${
                                                    reference?.name
                                                  } ${`${
                                                    reference?.jobTitle
                                                      ? ` - ${reference?.jobTitle}`
                                                      : ""
                                                  }`}</p></div>`
                                                : ""
                                            }
                                            ${
                                              reference?.company
                                                ? `<div class="avoid-page-break"><p style="margin-top: -10pt;">${reference?.company}</p></div>`
                                                : ""
                                            }
                                            ${
                                              reference?.address
                                                ? reference?.address
                                                    ?.split(",")
                                                    ?.map(
                                                      (line: any) =>
                                                        `<div class="avoid-page-break"><p style="margin-top: -10pt;">${line}</p></div>`
                                                    )
                                                    .join("")
                                                : ""
                                            }
                                            <div style="margin-top: -5pt;" style="margin-bottom: 5pt;">
                                                ${
                                                  reference?.email
                                                    ? `<div class="avoid-page-break"><p>E-mail: ${reference.email}</p></div>`
                                                    : ""
                                                }
                                                ${
                                                  reference?.phone
                                                    ? `<div class="avoid-page-break"><p style="margin-top: -10pt;">CELL: ${reference?.phone}</p></div>`
                                                    : ""
                                                }
                                            </div>
                                        </div>`
                                  )
                                  .join("")}
                            `
                            : ""
                        }
                    </div>
                </div>
            </body>
        </html>
    `;

    const template_2 = `
        <!DOCTYPE html>
        <head>
            <style>
                body {
                    padding: 0;
                    margin: 0;
                }
                @page {
                    margin-top: 40px;
                    margin-bottom: 30px;
                }
                @page:first {
                    margin-top: 0px;
                }   
                .bg {
                    background-color: rgba(0, 0, 0, 0.1);
                    font-family: Helvetica;
                    font-size: 15pt;
                }
                .text {
                    font-family: Helvetica;
                    font-size: 12pt;
                }
                
                #skills {
                    margin-left: 13pt;
                    padding-left: 0;
                    line-height: 1;
                }
            </style>
        </head>
        <html>
            <body>
                ${
                  personalDetails?.email || personalDetails?.phone
                    ? `
                            <div style="width: 100%; height: 50px;" class="bg">
                                <div style="display: flex; flex-direction: row; justify-content: space-between; width:90%; margin-left: 5%; margin-right: 5%">
                                    ${
                                      personalDetails?.phone
                                        ? `<div style="display: flex; flex-direction: row;  align-items: center;">
                                                <p style="font-size: 10pt; font-weight: 800; font-family: Arial;">${personalDetails?.phone}</p>
                                            </div>`
                                        : ""
                                    }
                                    ${
                                      personalDetails?.email
                                        ? `<div style="display: flex; flex-direction: row;  align-items: center;">
                                                <p style="font-size: 10pt; font-weight: 800; font-family: Arial;">${personalDetails?.email}</p>
                                            </div>`
                                        : ""
                                    }
                                </div>
                            </div>
                        `
                    : ""
                }
                <div style="margin-left: 5%; margin-right: 5%">
                    <div>
                        ${
                          personalDetails?.fullName
                            ? `<h1 class="text" style="font-size: 65px; font-weight: 800;">${personalDetails?.fullName}</h1>`
                            : ""
                        }
                        ${
                          personalDetails?.profession
                            ? `<h2 style="font-size: 15pt; font-family: Arial; font-weight: 800; margin-top: -30pt;">
                                    ${personalDetails?.profession?.toUpperCase()}
                                </h2>`
                            : ""
                        }
                    </div>
                    ${
                      proffessinalSummary || personalDetails?.pic
                        ? `<div style="display: flex; flex-direction: row; justify-content: space-between; align-items: start; margin-top: -20pt;">
                                ${
                                  proffessinalSummary
                                    ? `<p class="text" style="line-height: 1.2;">${proffessinalSummary}</p>`
                                    : ""
                                }
                                ${
                                  personalDetails?.pic
                                    ? `<img src="${personalDetails?.pic}" height="120px" width="120px" style="border-radius: 100%; margin-left: 10pt;" />`
                                    : ""
                                }
                            </div>`
                        : ""
                    }
                    <hr class="bg" style="height: 2pt; margin-top: 10pt;"/>
                </div>
                <div style="margin-left: 5%; margin-right: 5%">
                    <div style="column-fill: auto; column-count: 2; column-gap: 20px;">
                        ${
                          personalDetails?.email ||
                          personalDetails?.phone ||
                          personalDetails?.address ||
                          personalDetails?.nationality
                            ? `<div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>PERSONAL DETAILS</b></h2></div>
                                    ${
                                      personalDetails?.email
                                        ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">E-mail:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails?.email}
                                            </p>
                                        </div>`
                                        : ""
                                    }
                                ${
                                  personalDetails?.phone
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Phone Number:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails?.phone}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails?.address
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Address:</p></b> 
                                            <p style="line-height: 1.2; margin-left: 10pt;" class="text">
                                                ${personalDetails?.address}
                                            </p>
                                        </div>`
                                    : ""
                                } 
                                
                               ${
                                 personalDetails?.nationality
                                   ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                        <b><p class="text" style="line-height: 1;">Nationality:</p></b> 
                                        <p style="line-height: 1; margin-left: 10pt;" class="text">
                                            ${personalDetails?.nationality}
                                        </p>
                                    </div>`
                                   : ""
                               }
                                        `
                            : ""
                        }
                        ${
                          skills?.length
                            ? `<div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>SKILLS</b></h2></div>
                                <ul id="skills" style="margin-top: -5pt;">
                                    ${skills
                                      ?.map(
                                        (skill: any) =>
                                          `<div class="avoid-page-break">
                                                <li class="text" style="margin-top: 5pt;">${skill}</li>
                                            </div>`
                                      )
                                      .join("")}
                                </ul>
                                    `
                            : ""
                        }
                        ${
                          education?.length
                            ? `<div style="margin-top: 20pt;">
                                    <div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>EDUCATION</b></h2></div>
                                    ${education
                                      ?.map(
                                        (educationDetail: any) =>
                                          `<div style="margin-top: -5pt; line-height: 1;">
                                                <div class="avoid-page-break"><p class="text">
                                                    <b>${
                                                      educationDetail?.degree
                                                    }</b>
                                                </p></div>
                                                <div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: -20pt;">
                                                    <div class="avoid-page-break">
                                                        <p class="text">${educationDetail?.school?.toUpperCase()}</p>
                                                    </div>
                                                    <div class="avoid-page-break">
                                                        <h3 class="text">${new Date(
                                                          educationDetail?.endDate
                                                        )?.getFullYear()}</h3>
                                                    </div>
                                                </div>
                                            </div>`
                                      )
                                      .join("")}
                                </div>`
                            : ""
                        }
                        ${
                          workExperience?.length
                            ? `<div style="margin-top: 0pt;">
                                    <div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>WORK HISTORY</b></h2></div>
                                    ${workExperience
                                      ?.map(
                                        (workDetail: any) =>
                                          `
                                            <div class="avoid-page-break">
                                                <p style="font-family: Helvetica;"><b>${
                                                  workDetail?.jobTitle
                                                }</b> - ${new Date(
                                            workDetail.startDate
                                          )
                                            .toDateString()
                                            .slice(4)} to ${new Date(
                                            workDetail.endDate
                                          )
                                            .toDateString()
                                            .slice(4)}</p>
                                            </div>
                                            <div class="avoid-page-break">
                                                <p style="font-family: Helvetica; margin-top: -10pt;">${workDetail?.company?.toUpperCase()}</p>
                                            </div>
                                                ${
                                                  workDetail?.jobDescription
                                                    ? `<ul id="skills" style="margin-top: -5pt;">
                                                            ${workDetail?.jobDescription
                                                              ?.split("\n")
                                                              .map(
                                                                (
                                                                  description: any
                                                                ) =>
                                                                  `<div class="avoid-page-break">
                                                                        <li class="text" style="margin-top: 5pt;">${description?.slice(
                                                                          1
                                                                        )}</li>
                                                                    </div>`
                                                              )
                                                              .join("")}
                                                        </ul>`
                                                    : ""
                                                }
                                            `
                                      )
                                      .join("")}
                                </div>`
                            : ""
                        }
                        ${
                          references?.length
                            ? `<div class="avoid-page-break"><h2 class="bg" style="padding: 5px;">
                                    <b>REFERENCES</b>
                                </h2></div>
                                ${references
                                  ?.map(
                                    (reference: any) =>
                                      `<div>
                                            ${
                                              reference?.name
                                                ? `<div class="avoid-page-break"><p class="text">${
                                                    reference.name
                                                  } ${`${
                                                    reference.jobTitle
                                                      ? ` - ${reference.jobTitle}`
                                                      : ""
                                                  }`}</p></div>`
                                                : ""
                                            }
                                            ${
                                              reference?.company
                                                ? `<div class="avoid-page-break"><p class="text" style="margin-top: -10pt;">${reference.company}</p></div>`
                                                : ""
                                            }
                                            ${
                                              reference?.address
                                                ? reference?.address
                                                    ?.split(",")
                                                    ?.map(
                                                      (line: any) =>
                                                        `<div class="avoid-page-break"><p class="text" style="margin-top: -10pt;">${line}</p></div>`
                                                    )
                                                    .join("")
                                                : ""
                                            }
                                            <div style="margin-top: -5pt;" style="margin-bottom: 5pt;">
                                                ${
                                                  reference?.email
                                                    ? `<div class="avoid-page-break"><p class="text">E-mail: ${reference?.email}</p></div>`
                                                    : ""
                                                }
                                                ${
                                                  reference?.phone
                                                    ? `<div class="avoid-page-break"><p class="text" style="margin-top: -10pt;">CELL: ${reference?.phone}</p></div>`
                                                    : ""
                                                }
                                            </div>
                                        </div>`
                                  )
                                  .join("")}
                            `
                            : ""
                        }
                    </div>
                </div>
            </body>
        </html>
    `;
    const template_5 = `
        <!DOCTYPE html>
        <head>
            <style>
                body {
                    padding: 0;
                    margin: 0;
                }
                @page {
                    margin-top: 40px;
                    margin-bottom: 30px;
                }
                @page:first {
                    margin-top: 0px;
                }   
                .bg {
                    background-color: rgba(0, 0, 0, 0.1);
                    font-family: Helvetica;
                    font-size: 15pt;
                }
                .text {
                    font-family: Helvetica;
                    font-size: 12pt;
                }
                
                #skills {
                    margin-left: 13pt;
                    padding-left: 0;
                    line-height: 1;
                }
            </style>
        </head>
        <html>
            <body>
                ${
                  personalDetails?.email || personalDetails?.phone
                    ? `
                            <div style="width: 100%; height: 50px;" class="bg">
                                <div style="display: flex; flex-direction: row; justify-content: space-between; width:90%; margin-left: 5%; margin-right: 5%">
                                    ${
                                      personalDetails?.phone
                                        ? `<div style="display: flex; flex-direction: row;  align-items: center;">
                                                <p style="font-size: 10pt; font-weight: 800; font-family: Arial;">${personalDetails?.phone}</p>
                                            </div>`
                                        : ""
                                    }
                                    ${
                                      personalDetails?.email
                                        ? `<div style="display: flex; flex-direction: row;  align-items: center;">
                                                <p style="font-size: 10pt; font-weight: 800; font-family: Arial;">${personalDetails?.email}</p>
                                            </div>`
                                        : ""
                                    }
                                </div>
                            </div>
                        `
                    : ""
                }
                <div style="margin-left: 5%; margin-right: 5%">
                    <div>
                        ${
                          personalDetails?.fullName
                            ? `<h1 class="text" style="font-size: 65px; font-weight: 800;">${personalDetails?.fullName}</h1>`
                            : ""
                        }
                        ${
                          personalDetails?.profession
                            ? `<h2 style="font-size: 15pt; font-family: Arial; font-weight: 800; margin-top: -35pt;">
                                    ${personalDetails?.profession?.toUpperCase()}
                                </h2>`
                            : ""
                        }
                    </div>
                    ${
                      proffessinalSummary || personalDetails?.pic
                        ? `<div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; margin-top: -20pt;">
                                ${
                                  proffessinalSummary
                                    ? `<p class="text">${proffessinalSummary}</p>`
                                    : ""
                                }
                                ${
                                  personalDetails?.pic
                                    ? `<img src="${personalDetails?.pic}" height="120px" width="120px" style="border-radius: 100%; margin-left: 10pt;" />`
                                    : ""
                                }
                            </div>`
                        : ""
                    }
                    <hr class="bg" style="height: 2pt; margin-top: 10pt;"/>
                </div>
                <div style="margin-left: 5%; margin-right: 5%">
                    <div style="">
                        ${
                          personalDetails?.email ||
                          personalDetails?.phonr ||
                          personalDetails?.address ||
                          personalDetails?.nationality
                            ? `<div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>CONTACT DETAILS</b></h2></div>
                                    ${
                                      personalDetails?.email
                                        ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">E-mail:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails?.email}
                                            </p>
                                        </div>`
                                        : ""
                                    }
                                ${
                                  personalDetails?.phone
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Phone Number:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails?.phone}
                                            </p>
                                        </div>`
                                    : ""
                                }
                                ${
                                  personalDetails?.address
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Address:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails?.address}
                                            </p>
                                        </div>`
                                    : ""
                                } 
                                
                                ${
                                  personalDetails?.nationality
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                        <b><p class="text" style="line-height: 1;">Nationality:</p></b> 
                                        <p style="line-height: 1; margin-left: 10pt;" class="text">
                                            ${personalDetails?.nationality}
                                        </p>
                                    </div>`
                                    : ""
                                }
                                        `
                            : ""
                        }
                        ${
                          skills?.length
                            ? `<div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>SKILLS</b></h2></div>
                                <ul id="skills" style="margin-top: -5pt;">
                                    ${skills
                                      ?.map(
                                        (skill: any) =>
                                          `<div class="avoid-page-break">
                                                <li class="text" style="margin-top: 5pt;">${skill}</li>
                                            </div>`
                                      )
                                      .join("")}
                                </ul>
                                    `
                            : ""
                        }
                        ${
                          education?.length
                            ? `<div style="margin-top: 20pt;">
                                    <div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>EDUCATION</b></h2></div>
                                    ${education
                                      ?.map(
                                        (educationDetail: any) =>
                                          `<div style="margin-top: -5pt; line-height: 1;">
                                                <div class="avoid-page-break"><p class="text">
                                                    <b>${
                                                      educationDetail?.degree
                                                    }</b>
                                                </p></div>
                                                <div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: -20pt;">
                                                    <div class="avoid-page-break">
                                                        <p class="text">${educationDetail?.school?.toUpperCase()}</p>
                                                    </div>
                                                    <div class="avoid-page-break">
                                                        <p class="text">${new Date(
                                                          educationDetail?.endDate
                                                        )?.getFullYear()}</p>
                                                    </div>
                                                </div>
                                            </div>`
                                      )
                                      .join("")}
                                </div>`
                            : ""
                        }
                        ${
                          workExperience?.length
                            ? `<div style="margin-top: 0pt;">
                                    <div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>WORK HISTORY</b></h2></div>
                                    ${workExperience
                                      ?.map(
                                        (workDetail: any) =>
                                          `
                                            <div class="avoid-page-break">
                                                <h3 style="font-family: Helvetica;"><b>${
                                                  workDetail?.jobTitle
                                                }</b> - ${new Date(
                                            workDetail?.startDate
                                          )
                                            ?.toDateString()
                                            ?.slice(4)} to ${new Date(
                                            workDetail?.endDate
                                          )
                                            ?.toDateString()
                                            ?.slice(4)}</h3>
                                            </div>
                                            <div class="avoid-page-break">
                                                <p style="font-family: Helvetica; margin-top: -10pt;">${workDetail?.company?.toUpperCase()}</p>
                                            </div>
                                                ${
                                                  workDetail?.jobDescription
                                                    ? `<ul id="skills" style="margin-top: -5pt;">
                                                            ${workDetail?.jobDescription
                                                              ?.split("\n")
                                                              .map(
                                                                (
                                                                  description: any
                                                                ) =>
                                                                  `<div class="avoid-page-break">
                                                                        <li class="text" style="margin-top: 5pt;">${description?.slice(
                                                                          1
                                                                        )}</li>
                                                                    </div>`
                                                              )
                                                              .join("")}
                                                        </ul>`
                                                    : ""
                                                }
                                            `
                                      )
                                      .join("")}
                                </div>`
                            : ""
                        }
                       
                        ${
                          references?.length
                            ? `<div class="avoid-page-break"><h2 class="bg" style="padding: 5px;">
                                    <b>REFERENCES</b>
                                </h2></div>
                                ${references
                                  ?.map(
                                    (reference: any) =>
                                      `<div>
                                            ${
                                              reference?.name
                                                ? `<div class="avoid-page-break"><p class="text">${
                                                    reference?.name
                                                  } ${`${
                                                    reference.jobTitle
                                                      ? ` - ${reference.jobTitle}`
                                                      : ""
                                                  }`}</p></div>`
                                                : ""
                                            }
                                            ${
                                              reference?.company
                                                ? `<div class="avoid-page-break"><p class="text" style="margin-top: -10pt;">${reference?.company}</p></div>`
                                                : ""
                                            }
                                            ${
                                              reference?.address
                                                ? reference?.address
                                                    ?.split(",")
                                                    ?.map(
                                                      (line: any) =>
                                                        `<div class="avoid-page-break"><p class="text" style="margin-top: -10pt;">${line}</p></div>`
                                                    )
                                                    .join("")
                                                : ""
                                            }
                                            <div style="margin-top: -5pt;" style="margin-bottom: 5pt;">
                                                ${
                                                  reference?.email
                                                    ? `<div class="avoid-page-break"><p class="text">E-mail: ${reference?.email}</p></div>`
                                                    : ""
                                                }
                                                ${
                                                  reference.phone
                                                    ? `<div class="avoid-page-break"><p class="text" style="margin-top: -10pt;">CELL: ${reference?.phone}</p></div>`
                                                    : ""
                                                }
                                            </div>
                                        </div>`
                                  )
                                  .join("")}
                            `
                            : ""
                        }
                    </div>
                </div>
            </body>
        </html>
    `;

    const template_1 = `
    <!DOCTYPE html>
    <head>
        <style>
            
           @page {
                margin-left: 40px;
                margin-right: 40px;
                margin-top: 30px;
                margin-bottom: 40px;
            }
            
            .text {
                font-size: 11pt;
                font-family: Arial;
            }

            .hr {
                background-color: black;
                height: 1pt;
                margin-top: 0pt;
            }
            .subHeading {
                font-size: 13pt;
                font-family: Arial;
                background-color: rgba(0, 0, 0, 0.3);
                width: fit-content; 
                padding: 5px;
            }

            #skills {
                margin-left: 15pt;
                padding-left: 0;
                line-height: 1.2;
            }
            .avoid-page-break {
                page-break-inside: avoid;
            }
        </style>
    </head>
    <html>        
        <body style=">
             
            ${
              personalDetails
                ? `
                        <div style="line-height: 0;">
                            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                                    ${
                                      personalDetails.pic
                                        ? `
                                                <img src="${personalDetails.pic}" height="120px" width="120px" style="border-radius: 100%; align-self: center;"/>
                                            `
                                        : ""
                                    }
                            </div>
                            <h1 style="text-align: center; font-weight: 800; font-family: 'Times New Roman'; margin-bottom: 20pt;">
                                CURRICURUM VITAE
                            </h1>
                            ${
                              personalDetails?.email ||
                              personalDetails?.phone ||
                              personalDetails?.address ||
                              personalDetails?.nationality ||
                              personalDetails?.fullName
                                ? `<div>
                                        <div class="avoid-page-break"><h2 class="subHeading">
                                            <b>PERSONAL DETAILS</b>
                                        </h2></div>
                                        <div style="margin-top: -10pt;">
                                            ${
                                              personalDetails?.fullName
                                                ? `<div style="display: flex; flex-direction: row; align-items: center;">
                                                        <div style="width: 20%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                                                            <p class="text" style="font-weight: 800;">Full Name</p>
                                                            <p style="margin-right: 20px;">:</p>
                                                        </div>
                                                        <p class="text">${personalDetails?.fullName}</p>
                                                    </div>`
                                                : ""
                                            }
                                            ${
                                              personalDetails?.phone
                                                ? `<div style="display: flex; flex-direction: row; align-items: center; margin-top: -15pt;">
                                                        <div style="width: 20%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                                                            <p class="text" style="font-weight: 800;">Cell</p>
                                                            <p style="margin-right: 20px;" class="text">:</p>
                                                        </div>
                                                        <p>${personalDetails?.phone}</p>
                                                    </div>`
                                                : ""
                                            }
                                            ${
                                              personalDetails?.email
                                                ? `<div style="display: flex; flex-direction: row; align-items: center;  margin-top: -15pt;">
                                                        <div style="width: 20%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                                                            <p class="text" style="font-weight: 800;">E-mail</p>
                                                            <p style="margin-right: 20px;">:</p>
                                                        </div>
                                                        <p class="text">${personalDetails?.email}</p>
                                                    </div>`
                                                : ""
                                            }
                                            ${
                                              personalDetails?.address
                                                ? `<div style="display: flex; flex-direction: row; align-items: center; margin-top: -15pt;">
                                                        <div style="width: 20%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                                                            <p class="text" style="font-weight: 800;">Address</p>
                                                            <p style="margin-right: 20px;">:</p>
                                                        </div>
                                                        <p class="text">${personalDetails?.address}</p>
                                                    </div>`
                                                : ""
                                            }
                                            ${
                                              personalDetails?.nationality
                                                ? `<div style="display: flex; flex-direction: row; align-items: center; margin-top: -15pt;">
                                                        <div style="width: 20%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                                                            <p class="text" style="font-weight: 800;">Nationality</p>
                                                            <p style="margin-right: 20px;">:</p>
                                                        </div>
                                                        <p class="text">${personalDetails?.nationality}</p>
                                                    </div>`
                                                : ""
                                            }
                                           
                                        </div>
                                    </div>`
                                : ""
                            }
                           
                        </div>
                    `
                : ""
            }
            ${
              proffessinalSummary
                ? `<div style="margin-top: 10pt;">
                        <div class="avoid-page-break"><h2 class="subHeading">
                            <b>CAREER SUMMARY</b>
                        </h2></div>
                        <div class="avoid-page-break"><p class="text" style="margin-top: -5pt;">
                            ${proffessinalSummary}
                        </p></div>
                    </div>`
                : ""
            }
            ${
              skills?.length
                ? `<div style="margin-top: 20pt;">
                        <div class="avoid-page-break"><h2 class="subHeading">
                            <b>SKILLS</b>
                        </h2></div>
                            <ul id="skills" style="margin-top: -5pt;">
                                ${skills
                                  ?.map(
                                    (skill: any) =>
                                      `<div class="avoid-page-break">
                                            <li class="text" style="margin-top: 5pt;">${skill}</li>
                                        </div>`
                                  )
                                  .join("")}
                            </ul>
                    </div>`
                : ""
            }
            ${
              education?.length
                ? `<div style="margin-top: 20pt;">
                        <div class="avoid-page-break"><h2 class="subHeading">
                            <b>EDUCATION</b>
                        </h2></div>
                        ${education
                          ?.map(
                            (educationDetail: any) =>
                              `<div style="margin-top: -5pt; line-height: 1;">
                                    <div class="avoid-page-break"><p class="text">
                                        <b>${educationDetail?.degree}</b>
                                    </p></div>
                                    <div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: -20pt;">
                                        <div class="avoid-page-break"><p class="text">${
                                          educationDetail?.school
                                        }</p></div>
                                        <div class="avoid-page-break">
                                            <p class="text">(${new Date(
                                              educationDetail.startDate
                                            )
                                              .toDateString()
                                              .slice(4)} to ${new Date(
                                educationDetail?.endDate
                              )
                                ?.toDateString()
                                ?.slice(4)})</p>
                                        </div>
                                    </div>
                                </div>`
                          )
                          .join("")}
                    </div>`
                : ""
            }
            ${
              workExperience?.length
                ? `<div style="margin-top: 0pt;">
                        <div class="avoid-page-break"><h2 class="subHeading">
                            <b>WORK EXPERIENCE</b>
                        </h2></div>
                        ${workExperience
                          ?.map(
                            (workDetail: any) =>
                              `
                                ${
                                  workDetail?.company
                                    ? `
                                            <div style="display: flex; flex-direction: row; align-items: center; margin-top: -10pt;">
                                                    <div style="width: 20%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                                                        <p class="text" style="font-weight: 800;">Organization</p><p style="margin-right: 20px;">:</p>
                                                    </div>
                                                    <p class="text">${workDetail?.company}</p>
                                            </div>
                                        `
                                    : ""
                                }
                                ${
                                  workDetail?.jobTitle
                                    ? `
                                            <div style="display: flex; flex-direction: row; align-items: center; margin-top: -20pt;">
                                                    <div style="width: 20%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                                                        <p class="text" style="font-weight: 800;">Poisition</p><p style="margin-right: 20px;">:</p>
                                                    </div>
                                                    <p class="text">${workDetail?.jobTitle}</p>
                                            </div>
                                        `
                                    : ""
                                }
                                ${
                                  workDetail?.startDate || workDetail?.endDate
                                    ? `
                                            <div style="display: flex; flex-direction: row; align-items: center; margin-top: -20pt;">
                                                    <div style="width: 20%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                                                        <p class="text" style="font-weight: 800;">Duration</p><p style="margin-right: 20px;">:</p>
                                                    </div>
                                                    <p class="text">${new Date(
                                                      workDetail?.startDate
                                                    )
                                                      ?.toDateString()
                                                      ?.slice(4)} to ${new Date(
                                        workDetail?.endDate
                                      )
                                        ?.toDateString()
                                        ?.slice(4)}</p>
                                            </div>
                                        `
                                    : ""
                                }
                                ${
                                  workDetail?.jobDescription
                                    ? `
                                            <div style="margin-top: -10pt; line-height: 0.5; margin-bottom: 20pt;">
                                                <div class="avoid-page-break"><p><b>Description:</b></p></div>
                                                    ${
                                                      workDetail?.jobDescription
                                                        ? workDetail?.jobDescription
                                                            .split("\n")
                                                            .map(
                                                              (detail: any) =>
                                                                `<div class="avoid-page-break"><p class="text">${detail}</p></div>`
                                                            )
                                                            .join("")
                                                        : ""
                                                    }
                                            </div>
                                        `
                                    : ""
                                }
                                `
                          )
                          .join("")}
                    </div>`
                : ""
            }
            ${
              references?.length
                ? `<h2 class="subHeading">
                        <b>REFERENCES</b>
                    </h2>
                    ${references
                      ?.map(
                        (reference: any) =>
                          `<div>
                                ${
                                  reference?.name
                                    ? `<p class="text">${reference?.name} ${
                                        reference?.jobTitle
                                          ? ` - ${reference?.jobTitle}`
                                          : ""
                                      }</p>`
                                    : ""
                                }
                                ${
                                  reference?.company
                                    ? `<p style="margin-top: -10pt;" class="text">${reference?.company}</p>`
                                    : ""
                                }
                                ${
                                  reference?.address
                                    ? reference?.address
                                        ?.split(",")
                                        ?.map(
                                          (line: any) =>
                                            `<p style="margin-top: -10pt;" class="text">${line}</p>`
                                        )
                                        .join("")
                                    : ""
                                }
                                <div style="margin-top: -5pt;" style="margin-bottom: 5pt;">
                                    ${
                                      reference?.email
                                        ? `<p class="text">E-mail: ${reference.email}</p>`
                                        : ""
                                    }
                                    ${
                                      reference?.phone
                                        ? `<p style="margin-top: -10pt;" class="text">CELL: ${reference?.phone}</p>`
                                        : ""
                                    }
                                </div>
                            </div>`
                      )
                      .join("")}
                `
                : ""
            }
        </body>
    </html>

    `;

    const template_8 = `
        <!DOCTYPE html>
        <head>
            <style>
                body {
                    padding: 0;
                    margin: 0;
                }
                @page {
                    margin-top: 40px;
                    margin-bottom: 30px;
                }
                @page:first {
                    margin-top: 0px;
                }   
                .bg {
                    background-color: #FCA049;
                    font-family: Helvetica;
                    font-size: 13pt;
                }
                .text {
                    font-family: Helvetica;
                    font-size: 13pt;
                }
                
                #skills {
                    margin-left: 13pt;
                    padding-left: 0;
                    line-height: 1;
                }
            </style>
        </head>
        <html>
            <body>
                ${
                  personalDetails?.email || personalDetails?.phone
                    ? `
                            <div style="width: 100%; height: 50px;" class="bg">
                                <div style="display: flex; flex-direction: row; justify-content: space-between; width:90%; margin-left: 5%; margin-right: 5%">
                                    ${
                                      personalDetails?.phone
                                        ? `<div style="display: flex; flex-direction: row;  align-items: center;">
                                                <p style="font-size: 10pt; font-weight: 800; font-family: Arial;">${personalDetails?.phone}</p>
                                            </div>`
                                        : ""
                                    }
                                    ${
                                      personalDetails?.email
                                        ? `<div style="display: flex; flex-direction: row;  align-items: center;">
                                                <p style="font-size: 10pt; font-weight: 800; font-family: Arial;">${personalDetails?.email}</p>
                                            </div>`
                                        : ""
                                    }
                                </div>
                            </div>
                        `
                    : ""
                }
                <div style="margin-left: 5%; margin-right: 5%">
                    <div>
                        ${
                          personalDetails?.fullName
                            ? `<h1 class="text" style="font-size: 65px; font-weight: 800;">${personalDetails?.fullName}</h1>`
                            : ""
                        }
                        ${
                          personalDetails?.profession
                            ? `<h2 style="font-size: 15pt; font-family: Arial; font-weight: 800; margin-top: -35pt;">
                                    ${personalDetails?.profession.toUpperCase()}
                                </h2>`
                            : ""
                        }
                    </div>
                    ${
                      proffessinalSummary || personalDetails?.pic
                        ? `<div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; margin-top: -20pt;">
                                ${
                                  proffessinalSummary
                                    ? `<p>${proffessinalSummary}</p>`
                                    : ""
                                }
                                ${
                                  personalDetails?.pic
                                    ? `<img src="${personalDetails?.pic}" height="120px" width="120px" style="border-radius: 100%; margin-left: 10pt;" />`
                                    : ""
                                }
                            </div>`
                        : ""
                    }
                    <hr class="bg" style="height: 2pt; margin-top: 10pt;"/>
                </div>
                <div style="margin-left: 5%; margin-right: 5%">
                    <div style="">
                    
                        ${
                          personalDetails?.email ||
                          personalDetails?.phoneNumber ||
                          personalDetails?.address ||
                          personalDetails?.nationality
                            ? `<div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>PERSONAL DETAILS</b></h2></div>
                                    ${
                                      personalDetails?.email
                                        ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">E-mail:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails?.email}
                                            </p>
                                        </div>`
                                        : ""
                                    }
                                ${
                                  personalDetails?.phone
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Phone Number:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails?.phone}
                                            </p>
                                        </div>
                                        `
                                    : ""
                                }
                                ${
                                  personalDetails?.address
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                            <b><p class="text" style="line-height: 1;">Address:</p></b> 
                                            <p style="line-height: 1; margin-left: 10pt;" class="text">
                                                ${personalDetails?.address}
                                            </p>
                                        </div>`
                                    : ""
                                } 
                                
                                ${
                                  personalDetails?.nationality
                                    ? `<div class="text" style="display: flex; flex-direction: row; margin-top: -15pt; align-items: flex-start;">
                                        <b><p class="text" style="line-height: 1;">Nationality:</p></b> 
                                        <p style="line-height: 1; margin-left: 10pt;" class="text">
                                            ${personalDetails?.nationality}
                                        </p>
                                    </div>`
                                    : ""
                                }
                                        `
                            : ""
                        }
                        ${
                          skills?.length
                            ? `<div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>SKILLS</b></h2></div>
                                <ul id="skills" style="margin-top: -5pt;">
                                    ${skills
                                      .map(
                                        (skill: any) =>
                                          `<div class="avoid-page-break">
                                                <li class="text" style="margin-top: 5pt;">${skill}</li>
                                            </div>`
                                      )
                                      .join("")}
                                </ul>
                                    `
                            : ""
                        }
                        ${
                          education?.length
                            ? `<div style="margin-top: 20pt;">
                                    <div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>EDUCATION</b></h2></div>
                                    ${education
                                      ?.map(
                                        (educationDetail: any) =>
                                          `<div style="margin-top: -5pt; line-height: 1;">
                                                <div class="avoid-page-break"><p class="text">
                                                    <b>${
                                                      educationDetail?.degree
                                                    }</b>
                                                </p></div>
                                                <div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: -20pt;">
                                                    <div class="avoid-page-break">
                                                        <p class="text">${educationDetail?.school?.toUpperCase()}</p>
                                                    </div>
                                                    <div class="avoid-page-break">
                                                        <p class="text">${new Date(
                                                          educationDetail?.endDate
                                                        )?.getFullYear()}</p>
                                                    </div>
                                                </div>
                                            </div>`
                                      )
                                      .join("")}
                                </div>`
                            : ""
                        }
                        ${
                          workExperience?.length
                            ? `<div style="margin-top: 0pt;">
                                    <div class="avoid-page-break"><h2 class="bg" style="padding: 5px;"><b>WORK HISTORY</b></h2></div>
                                    ${workExperience
                                      ?.map(
                                        (workDetail: any) =>
                                          `
                                            <div class="avoid-page-break">
                                                <p style="font-family: Helvetica;"><b>${
                                                  workDetail?.jobTitle
                                                }</b> - ${new Date(
                                            workDetail?.startDate
                                          )
                                            ?.toDateString()
                                            ?.slice(4)} to ${new Date(
                                            workDetail?.endDate
                                          )
                                            ?.toDateString()
                                            ?.slice(4)}</p>
                                            </div>
                                            <div class="avoid-page-break">
                                                <p class="text" style="font-family: Helvetica; margin-top: -10pt;">${workDetail?.company?.toUpperCase()}</p>
                                            </div>
                                                ${
                                                  workDetail?.jobDescription
                                                    ? `<ul id="skills" style="margin-top: -5pt;">
                                                            ${workDetail?.description
                                                              ?.split("\n")
                                                              ?.map(
                                                                (
                                                                  description: any
                                                                ) =>
                                                                  `<div class="avoid-page-break">
                                                                        <li class="text" style="margin-top: 5pt;">${description?.slice(
                                                                          1
                                                                        )}</li>
                                                                    </div>`
                                                              )
                                                              .join("")}
                                                        </ul>`
                                                    : ""
                                                }
                                            `
                                      )
                                      .join("")}
                                </div>`
                            : ""
                        }
                        ${
                          references?.length
                            ? `<div class="avoid-page-break"><h2 class="bg" style="padding: 5px;">
                                    <b>REFERENCES</b>
                                </h2></div>
                                ${references
                                  ?.map(
                                    (reference: any) =>
                                      `<div>
                                            ${
                                              reference?.name
                                                ? `<div class="avoid-page-break"><p class="text">${
                                                    reference?.name
                                                  } ${`${
                                                    reference.jobTitle
                                                      ? ` - ${reference.jobTitle}`
                                                      : ""
                                                  }`}</p></div>`
                                                : ""
                                            }
                                            ${
                                              reference?.company
                                                ? `<div class="avoid-page-break"><p class="text" style="margin-top: -10pt;">${reference?.company}</p></div>`
                                                : ""
                                            }
                                            ${
                                              reference?.address
                                                ? reference?.address
                                                    ?.split(",")
                                                    ?.map(
                                                      (line: any) =>
                                                        `<div class="avoid-page-break"><p class="text" style="margin-top: -10pt;">${line}</p></div>`
                                                    )
                                                    .join("")
                                                : ""
                                            }
                                            <div style="margin-top: -5pt;" style="margin-bottom: 5pt;">
                                                ${
                                                  reference?.email
                                                    ? `<div class="avoid-page-break"><p class="text">E-mail: ${reference?.email}</p></div>`
                                                    : ""
                                                }
                                                ${
                                                  reference?.phone
                                                    ? `<div class="avoid-page-break"><p class="text" style="margin-top: -10pt;">CELL: ${reference?.phone}</p></div>`
                                                    : ""
                                                }
                                            </div>
                                        </div>`
                                  )
                                  .join("")}
                            `
                            : ""
                        }
                    </div>
                </div>
            </body>
        </html>
    `;

    return {
      template_6,
      template_3,
      template_7,
      template_9,
      template_4,
      template_2,
      template_5,
      template_1,
      template_8,
    };
  } catch (error) {
    console.log(error);
    return {};
  }
};

export default Templates;
