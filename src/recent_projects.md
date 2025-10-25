---
title: "Current research projects"
layout: layouts/terminal_page.njk
---

<ul>
  {% for project in collections.projects %}
    <li><a href="{{ project.url | url}}">{{ project.data.title }}</a></li>
  {% endfor %}
</ul>

