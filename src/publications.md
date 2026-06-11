---
title: Publications
layout: layouts/terminal_page.njk
---

# Publications

<div class="font-mono text-sm space-y-1 p-2">

{% set current_year = "" %}

{% for pub in publications %}
{% set authors = pub.authors | join(", ") %}

{# 1. AFFICHAGE DE L'ANNÉE SI ELLE CHANGE #}
{% if pub.year != current_year %}
{% set current_year = pub.year %}
<div class="text-xl font-mono font-bold text-gray-500 mt-6 mb-2 border-b border-gray-800 pb-1">
<span class="text-blue-500">❯</span> Année {{ current_year }}
</div>
{% endif %}

{# 2. VOTRE CODE EXISTANT POUR CHAQUE PUBLICATION #}
{% if pub.type == "ART" %}
{% set typeIcon = "📄" %}
{% set schemaType = "ScholarlyArticle" %}
{% elif pub.type == "RAP" %}
{% set typeIcon = "📘" %}
{% set schemaType = "DigitalDocument" %}
{% elif pub.type == "THS" %}
{% set typeIcon = "🎓" %}
{% set schemaType = "Thesis" %}
{% else %}
{% set typeIcon = "📁" %}
{% set schemaType = "CreativeWork" %}
{% endif %}

{% if pub.journal %}
{% set journal = " [" ~ pub.journal ~ "]" %}
{% else %}
{% set journal = "" %}
{% endif %}

{% if pub.doi %}
{% set doiLink = " (DOI: " ~ pub.doi ~ ")" %}
{% else %}
{% set doiLink = "" %}
{% endif %}

{# Affichage de la publication (avec indentation pl-4 pour l'effet arborescence sous l'année) #}
  <div itemscope itemtype="https://schema.org/{{ schemaType }}" class="pl-4 mb-2 font-mono text-sm">
    <span class="text-green-400" aria-hidden="true">{{ typeIcon }}</span>
    <a href="{{ pub.url }}" itemprop="url" class="text-white hover:underline">
      <span itemprop="name">{{ pub.title }}</span>
    </a>
    <span class="text-gray-400">
      {% if pub.journal %}<span itemprop="isPartOf">{{ journal }}</span>{% endif %}
      <meta itemprop="datePublished" content="{{ pub.year }}">
    </span>
    <span class="text-yellow-300"> - <span itemprop="author">{{ authors }}</span></span>
    {% if pub.doi %}
      <span class="text-blue-400" itemprop="identifier">{{ doiLink }}</span>
    {% endif %}
  </div>

{% endfor %}

</div>