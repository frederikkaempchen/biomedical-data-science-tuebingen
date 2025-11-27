import { attachEmailHandlers } from "/wp-content/custom-code/shared/js/utils.js";


const dataLocation = "/wp-content/custom-code/data";
const peopleImagesLocation = `${dataLocation}/images/people`;
const assetImagesLocation = `${dataLocation}/images/assets`
const teamsDataLocation = `${dataLocation}/json/teamsData.json`;

async function fetchTeams (pathname) {
  const res = await fetch(pathname);
  const data = await res.json();
  return data;
}

async function displayTeams (pathname) {
    const members = await fetchTeams(pathname);
    const teamDiv = document.getElementById('team')
    teamDiv.innerHTML = '';

    for (const [key, value] of Object.entries(members)) {
        if (String(key).includes("SUBGROUP")) {
            const subgroupDiv = document.createElement('div')
            subgroupDiv.textContent = value
            subgroupDiv.classList.add("subgroup")
            teamDiv.appendChild(subgroupDiv)
        }
        else {
            const memberDiv = document.createElement('div')
            memberDiv.classList.add('team-member')
            memberDiv.id = `${key}`

            if (value.image) {
                const memberImage = document.createElement('img')
                memberImage.classList.add('member-image')
                memberImage.src = `${peopleImagesLocation}/${value.image}.jpg`
                memberImage.alt = value.name
                memberDiv.appendChild(memberImage)
            }
            
            const memberDataDiv = document.createElement('div')
            memberDataDiv.classList.add('member-data')

            const memberName = document.createElement('p')
            memberName.classList.add('member-name')
            memberName.textContent = value.name
            memberDataDiv.appendChild(memberName)

            const memberTitle = document.createElement('p')
            memberTitle.classList.add('member-title')
            memberTitle.textContent = value.title
            memberDataDiv.appendChild(memberTitle)

            if (value.text) {
                const memberText = document.createElement('p')
                memberText.classList.add('member-text')
                memberText.textContent = value.text
                memberDataDiv.appendChild(memberText)
            }

            
            

            const iconsDiv = document.createElement('div')
            iconsDiv.classList.add('icons')

            if (value.links) {
                for (const [linkType, link] of Object.entries(value.links)) {
                    if (String(linkType) === "mail") {
                        const mailDiv = document.createElement('div')
                        mailDiv.classList.add("email-wrapper")

                        const mailLink = document.createElement('a')
                        mailLink.classList.add('email-link')
                        mailLink.setAttribute('aria-label', 'email');
                        mailLink.setAttribute('data-encoded-mail', link);

                        const mailIcon = document.createElement('span')
                        mailIcon.classList.add('material-symbols-outlined')
                        mailIcon.textContent = "mail"
                        mailLink.appendChild(mailIcon)

                        mailDiv.appendChild(mailLink)

                        iconsDiv.appendChild(mailDiv)
                    } else {
                        const iconDiv = document.createElement('div')
                        iconDiv.classList.add("icon-wrapper")

                        const iconLink = document.createElement('a')
                        iconLink.classList.add('icon-link')
                        iconLink.href = link
                        iconLink.setAttribute('aria-label', String(linkType));

                        const iconSvg = document.createElement('img')
                        iconSvg.classList.add('icon-svg')
                        iconSvg.src = `${assetImagesLocation}/${String(linkType)}-icon.svg`
                        iconLink.appendChild(iconSvg)

                        iconDiv.appendChild(iconLink)

                        iconsDiv.appendChild(iconDiv)
                    }
                }
            }
            
            

            memberDataDiv.appendChild(iconsDiv)
            
            memberDiv.appendChild(memberDataDiv)

            teamDiv.appendChild(memberDiv)
        }
    }
}


async function main() {
    await displayTeams(teamsDataLocation);
    attachEmailHandlers();
}

document.addEventListener("DOMContentLoaded", function() {
    main()
})

