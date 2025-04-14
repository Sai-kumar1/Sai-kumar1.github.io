---
layout: default
title: Blogs
---
<h3 class="fw-bold"> Blogs </h3>
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
