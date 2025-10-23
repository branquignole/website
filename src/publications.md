---
title: Publications
layout: layouts/terminal_page.njk
---

# Publications

<div class="font-mono text-sm space-y-1 p-2">

{% for pub in publications %}
{% set authors = pub.authors | join(", ") %}

{# Choix de l'icône selon le type de publication #}
{% if pub.type == "ART" %}
{% set typeIcon = "📄" %}
{% elif pub.type == "RAP" %}
{% set typeIcon = "📘" %}
{% elif pub.type == "THS" %}
{% set typeIcon = "🎓" %}
{% else %}
{% set typeIcon = "📁" %}
{% endif %}

{# Journal / conférence #}
{% if pub.journal %}
{% set journal = " [" ~ pub.journal ~ "]" %}
{% else %}
{% set journal = "" %}
{% endif %}

{# DOI #}
{% if pub.doi %}
{% set doiLink = " (DOI: " ~ pub.doi ~ ")" %}
{% else %}
{% set doiLink = "" %}
{% endif %}

{# Affichage style tree #}
  <div>
    <span class="text-green-400">{{ typeIcon }}</span>
    <a href="{{ pub.url }}" class="text-white hover:underline">{{ pub.title }}</a>
    <span class="text-gray-400">{{ journal }} ({{ pub.year }})</span>
    <span class="text-yellow-300"> - {{ authors }}</span>
    <span class="text-blue-400">{{ doiLink }}</span>
  </div>

{% endfor %}

</div>