---
layout: default
title: Projects
---

<ul class="project-list">
  {% if site.projects and site.projects != empty %}
    {% for project in site.projects %}
      <li>
        <a href="{{ project.url }}">
          {{ project.title }}
        </a>
        <br>
      </li>
    {% endfor %}
  {% else %}
    <p class="fwt-bold text-danger">No projects found.</p>
  {% endif %}
</ul>
