// ==UserScript==
// @name         Endorse all skills
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       goodwin64
// @match        https://www.linkedin.com/in/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    debugger;
    window.appendMagicButtonInterval = setInterval(appendEndorseAllSkillsButton, 500);
    window.stylesMap = {
        ENDORSE_ALL_SKILLS: '#endorseAllSkillsButton{-webkit-box-shadow:0 1px 0 0 #fff6af;box-shadow:0 1px 0 0 #fff6af;background:-webkit-gradient(linear,left top,left bottom,color-stop(.05,#ffec64),color-stop(1,#ffab23));background:-moz-linear-gradient(top,#ffec64 5%,#ffab23 100%);background:-webkit-linear-gradient(top,#ffec64 5%,#ffab23 100%);background:-o-linear-gradient(top,#ffec64 5%,#ffab23 100%);background:-ms-linear-gradient(top,#ffec64 5%,#ffab23 100%);background:linear-gradient(to bottom,#ffec64 5%,#ffab23 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#ffec64\', endColorstr=\'#ffab23\', GradientType=0);background-color:#ffec64;-moz-border-radius:6px;border-radius:6px;display:inline-block;font-size:12px;font-weight:700;padding:6px 24px;text-shadow:0 1px 0 #fe6;height:22px;line-height:11px}#endorseAllSkillsButton:hover{background:-webkit-gradient(linear,left top,left bottom,color-stop(.05,#ffab23),color-stop(1,#ffec64));background:-moz-linear-gradient(top,#ffab23 5%,#ffec64 100%);background:-webkit-linear-gradient(top,#ffab23 5%,#ffec64 100%);background:-o-linear-gradient(top,#ffab23 5%,#ffec64 100%);background:-ms-linear-gradient(top,#ffab23 5%,#ffec64 100%);background:linear-gradient(to bottom,#ffab23 5%,#ffec64 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#ffab23\', endColorstr=\'#ffec64\', GradientType=0);background-color:#ffab23}',
    };
    const styles = document.createElement('style');
    styles.innerText += getStylesForButton('ENDORSE_ALL_SKILLS');
    document.body.appendChild(styles);

    function appendEndorseAllSkillsButton() {
        const headings = Array.from(document.querySelectorAll('.pv-profile-section__card-heading'));

        const skillsHeading = headings && headings.find(el => el.innerText && el.innerText.includes('Skills'));

        const thereIsNoMagicButtonAlready = !document.getElementById('endorseAllSkillsButton');
        if (skillsHeading && thereIsNoMagicButtonAlready) {
            const endorseAllSkillsButton = document.createElement('button');
            endorseAllSkillsButton.id = 'endorseAllSkillsButton';
            endorseAllSkillsButton.innerText = 'Endorse all :)';
            endorseAllSkillsButton.addEventListener('click', () => {
                endorseAll && endorseAll();
            });
            skillsHeading.appendChild(endorseAllSkillsButton);
            clearInterval(window.appendMagicButtonInterval);
        }
    }

    function endorseAll() {
        // open all
        const showMoreBtn = document.querySelector('[data-control-name="skill_details"]');
        showMoreBtn && showMoreBtn.click && showMoreBtn.click();

        // endorse all
        const plusButtons = document.querySelectorAll('[data-control-name="endorse"]');
        plusButtons && plusButtons.forEach && plusButtons.forEach(el => el.click && el.click());
    }

    function getStylesForButton(buttonLabel) {
        return window.stylesMap[buttonLabel] || '';
    }
})();