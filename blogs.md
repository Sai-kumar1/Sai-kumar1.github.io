---
layout: default
title: Blogs
---

<h1>Blogs</h1>

<ul class="blog-list">
    {% if site.blogs and site.blogs != empty %}
        {% for blog in site.blogs %}
            <li>
            <a href="{{ blog.url }}">
                {{ blog.title }}
            </a>
            <br>
            </li>
        {% endfor %}
    {% else %}
        <p class="fwt-bold text-danger">No blogs found.</p>
    {% endif %}
</ul>
