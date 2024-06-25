---
layout: ../../layouts/BlogLayout.astro
title: chromeOS boot process deep dive
description: the ultimate answer to "Why not XYZ?"
datePublished: 2024-06-19
---

the chromeOS platform's internal workings have always been very interesting to me. unlike your average PC, chromeOS devices are built with the express purpose of getting the user to a specified "single, dedicated application", safely. the firmware is built with security in mind, completely wiping out the user's data through TPM-backed encryption, combined with the user's account password. if an anomaly in the boot process is detected. the computer immediately drops to recovery mode, where the only way to get the device back into working condition is to create a recovery USB and reinstall the operating system, completely destroying stateful (the name for the partition where user data is stored), and booting the user back into setup when completed.

this blog post aims to explain the things you can and can't do with <a target="_blank" href="https://sh1mmer.me">sh1mmer</a>, an exploit taking advantage of a select few very poorly secured factory tools, called shims.

first of all, probably the most common question i've seen asked, is why sh1mmer can't just delete chrome extensions. chromeOS platform TPM registers don't exactly function like a UEFI-compliant PC's, 

sorrgy i got tired here and now i don't wanna write the rest