(function () {
  const config = window.PAPER_SITE || {};
  (config.authors || []).forEach((author) => {
    if (author.name === "Le Liu") author.note = "2\u2020";
    if (author.name === "Di Xu") author.note = "1\u2020";
  });

  const textFields = document.querySelectorAll("[data-field]");
  textFields.forEach((node) => {
    const key = node.getAttribute("data-field");
    if (typeof config[key] === "string") {
      if (key === "teaserCaption") {
        node.innerHTML = config[key];
      } else {
        node.textContent = config[key];
      }
      node.hidden = config[key].trim() === "";
    }
  });

  document.title = config.title || "Paper Project Page";

  renderAuthors();
  renderResources();
  renderTeaser();
  renderTakeaways();
  renderMeshes();
  renderMethod();
  renderTable();
  renderBibtex();

  function renderAuthorsLegacy() {
    const authors = document.getElementById("authors");
    const affiliations = document.getElementById("affiliations");
    if (!authors || !affiliations) return;

    authors.innerHTML = "";
    (config.authors || []).forEach((author, index) => {
      const authorNode = document.createElement("span");
      authorNode.className = "author-name";
      authorNode.textContent = author.name;
      if (author.note) {
        const sup = document.createElement("sup");
        sup.textContent = author.note;
        authorNode.appendChild(sup);
      }
      authors.appendChild(authorNode);

      if (index < config.authors.length - 1) {
        const sep = document.createElement("span");
        sep.textContent = ",";
        sep.setAttribute("aria-hidden", "true");
        authors.appendChild(sep);
      }
    });

    affiliations.textContent = (config.affiliations || []).join(" · ");
  }
  function renderAuthors() {
    const authors = document.getElementById("authors");
    const affiliations = document.getElementById("affiliations");
    if (!authors || !affiliations) return;

    authors.innerHTML = "";
    (config.authors || []).forEach((author, index) => {
      const link = document.createElement("a");
      link.href = author.url || "#";
      link.textContent = author.name;
      if (author.note) {
        const sup = document.createElement("sup");
        sup.textContent = author.note;
        link.appendChild(sup);
      }
      if (author.url && author.url !== "#") {
        link.target = "_blank";
        link.rel = "noreferrer";
      }
      authors.appendChild(link);

      if (index < config.authors.length - 1) {
        const sep = document.createElement("span");
        sep.textContent = ",";
        sep.setAttribute("aria-hidden", "true");
        authors.appendChild(sep);
      }
    });

    affiliations.innerHTML = "";
    (config.affiliations || []).forEach((affiliation) => {
      const line = document.createElement("div");
      const match = String(affiliation).match(/^(\d+)\s+(.+)$/);
      if (match) {
        const sup = document.createElement("sup");
        sup.textContent = match[1];
        line.appendChild(sup);
        line.appendChild(document.createTextNode(match[2]));
      } else {
        line.textContent = affiliation;
      }
      affiliations.appendChild(line);
    });
  }

  function renderAuthors() {
    const authors = document.getElementById("authors");
    const affiliations = document.getElementById("affiliations");
    if (!authors || !affiliations) return;

    authors.innerHTML = "";
    (config.authors || []).forEach((author, index) => {
      const authorNode = document.createElement("span");
      authorNode.className = "author-name";
      authorNode.textContent = author.name;
      if (author.note) {
        const sup = document.createElement("sup");
        sup.textContent = author.note;
        authorNode.appendChild(sup);
      }
      authors.appendChild(authorNode);

      if (index < config.authors.length - 1) {
        const sep = document.createElement("span");
        sep.textContent = ",";
        sep.setAttribute("aria-hidden", "true");
        authors.appendChild(sep);
      }
    });

    affiliations.innerHTML = "";
    (config.affiliations || []).forEach((affiliation) => {
      const line = document.createElement("div");
      const match = String(affiliation).match(/^(\d+)\s+(.+)$/);
      if (match) {
        const sup = document.createElement("sup");
        sup.textContent = match[1];
        line.appendChild(sup);
        line.appendChild(document.createTextNode(match[2]));
      } else {
        line.textContent = affiliation;
      }
      affiliations.appendChild(line);
    });
  }

  function renderResources() {
    const buttonRow = document.getElementById("resourceButtons");
    const resourceList = document.getElementById("resourceList");
    if (!buttonRow) return;

    buttonRow.innerHTML = "";
    if (resourceList) resourceList.innerHTML = "";

    (config.resources || []).forEach((resource) => {
      const button = document.createElement("a");
      button.className = `button${resource.primary ? "" : " secondary"}`;
      button.href = resource.url || "#";
      button.innerHTML = `${getResourceIcon(resource)}<span>${escapeHtml(
        resource.label
      )}</span>`;
      setExternalAttrs(button, resource.url);
      buttonRow.appendChild(button);

      if (resourceList) {
        const item = document.createElement("a");
        item.className = "resource-item";
        item.href = resource.url || "#";
        setExternalAttrs(item, resource.url);
        item.innerHTML = `<strong>${getResourceIcon(resource)}<span>${escapeHtml(
          resource.label
        )}</span></strong><p>${escapeHtml(
          resource.description || "Add resource description."
        )}</p>`;
        resourceList.appendChild(item);
      }
    });
  }

  function renderTeaser() {
    const teaser = document.getElementById("teaser");
    if (!teaser) return;
    teaser.innerHTML = "";

    const item = config.teaser || {};
    if (item.src) {
      teaser.appendChild(createMedia(item, "Project teaser"));
    } else {
      teaser.appendChild(createPlaceholder("Add teaser image or video in site.config.js"));
    }
  }

  function renderTakeaways() {
    const list = document.getElementById("takeawaysList");
    const highlight = document.getElementById("highlightText");
    if (!list) return;
    if (highlight) highlight.textContent = config.highlight || "";
    list.innerHTML = "";

    (config.takeaways || []).forEach((takeaway) => {
      const item = document.createElement("article");
      item.className = "takeaway";
      item.innerHTML = `<strong>${escapeHtml(takeaway.title)}</strong><p>${escapeHtml(
        takeaway.text
      )}</p>`;
      list.appendChild(item);
    });
  }

  function renderGallery() {
    const grid = document.getElementById("galleryGrid");
    if (!grid) return;
    grid.innerHTML = "";

    (config.gallery || []).forEach((item) => {
      const card = document.createElement("article");
      card.className = "gallery-card";

      const media = document.createElement("div");
      media.className = "gallery-media";
      media.appendChild(item.src ? createMedia(item, item.title) : createPlaceholder("Add media"));

      const body = document.createElement("div");
      body.className = "gallery-body";
      body.innerHTML = `<h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p>`;

      card.append(media, body);
      grid.appendChild(card);
    });
  }

  function renderMeshes() {
    const grid = document.getElementById("meshGrid");
    if (!grid) return;
    grid.innerHTML = "";

    (config.meshes || []).filter((item) => !item.hidden).forEach((item) => {
      const card = document.createElement("article");
      card.className = "scene-demo-card";

      const imagePanel = document.createElement("div");
      imagePanel.className = "scene-demo-panel";
      imagePanel.innerHTML = `<h3>Input Scene</h3>`;
      if (item.image) {
        const image = document.createElement("img");
        image.src = item.image;
        image.alt = item.imageAlt || item.title || "Input scene";
        imagePanel.appendChild(image);
      } else {
        imagePanel.appendChild(createPlaceholder("Add an input scene image"));
      }
      card.appendChild(imagePanel);

      const meshPanel = document.createElement("div");
      meshPanel.className = "scene-demo-panel";
      meshPanel.innerHTML = `<h3>Generated 3D Scene</h3>`;
      if (item.src) {
        const viewer = document.createElement("model-viewer");
        viewer.alt = item.title || "Interactive mesh";
        viewer.setAttribute("camera-controls", "");
        viewer.setAttribute("interaction-prompt", "none");
        viewer.setAttribute("loading", "lazy");
        viewer.setAttribute("orientation", item.orientation || config.meshViewer?.orientation || "0deg 0deg 0deg");
        viewer.setAttribute("camera-orbit", item.cameraOrbit || config.meshViewer?.cameraOrbit || "0deg 75deg auto");
        viewer.setAttribute("camera-target", "auto auto auto");
        viewer.setAttribute("shadow-intensity", "0.7");
        viewer.setAttribute("exposure", "1");
        if (item.poster) viewer.poster = item.poster;
        viewer.addEventListener("load", () => {
          if (typeof viewer.updateFraming === "function") viewer.updateFraming();
        });
        viewer.src = item.src;
        meshPanel.appendChild(viewer);
      } else {
        meshPanel.appendChild(createPlaceholder("Add a GLB or GLTF file to enable 3D viewing"));
      }
      card.appendChild(meshPanel);
      grid.appendChild(card);
    });
  }

  function renderMethod() {
    const figure = document.getElementById("methodFigure");
    if (!figure) return;

    const method = config.method || {};
    const methodIntro = document.querySelector('[data-field="methodIntro"]');
    if (methodIntro && method.intro) methodIntro.textContent = method.intro;
    document.querySelectorAll(".figure-caption").forEach((caption) => caption.remove());

    figure.innerHTML = "";
    if (method.figure && method.figure.src) {
      const image = document.createElement("img");
      image.src = method.figure.src;
      image.alt = method.figure.alt || "Method figure";
      figure.appendChild(image);
      if (method.figure.caption) {
        const caption = document.createElement("p");
        caption.className = "caption section-caption figure-caption";
        caption.textContent = method.figure.caption;
        figure.insertAdjacentElement("afterend", caption);
      }
    } else {
      figure.appendChild(createPlaceholder("Add overview or architecture figure"));
    }
  }

  function renderTable() {
    const table = document.getElementById("resultsTable");
    if (!table) return;

    const thead = table.querySelector("thead");
    const tbody = table.querySelector("tbody");
    const data = config.resultsTable || {};
    thead.innerHTML = "";
    tbody.innerHTML = "";

    (data.headerRows || [data.headers || []]).forEach((row) => {
      const headerRow = document.createElement("tr");
      row.forEach((header) => {
        const th = document.createElement("th");
        if (typeof header === "string") {
          th.textContent = header;
        } else {
          th.textContent = header.label;
          if (header.colspan) th.colSpan = header.colspan;
          if (header.rowspan) th.rowSpan = header.rowspan;
        }
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
    });

    (data.rows || []).forEach((row) => {
      const tr = document.createElement("tr");
      if ((data.highlightRows || []).includes(row[0])) {
        tr.className = "highlight-row";
      }
      row.forEach((cell) => {
        const td = document.createElement("td");
        td.textContent = cell;
        const style = data.cellStyles && data.cellStyles[row[0]] && data.cellStyles[row[0]][tr.children.length];
        if (style) {
          td.className = style
            .split(" ")
            .map((name) => `cell-${name}`)
            .join(" ");
        }
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  }

  function renderBibtex() {
    const code = document.getElementById("bibtex");
    const copy = document.getElementById("copyBibtex");
    if (!code || !copy) return;

    code.textContent = config.bibtex || "";
    copy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(config.bibtex || "");
        copy.textContent = "Copied";
        window.setTimeout(() => {
          copy.textContent = "Copy";
        }, 1400);
      } catch (error) {
        copy.textContent = "Select text";
      }
    });
  }

  function createMedia(item, label) {
    if (item.type === "video" || /\.(mp4|webm|mov)$/i.test(item.src || "")) {
      const video = document.createElement("video");
      video.src = item.src;
      video.poster = item.poster || "";
      video.controls = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = "metadata";
      video.setAttribute("aria-label", label || "Video");
      return video;
    }

    const image = document.createElement("img");
    image.src = item.src;
    image.alt = item.alt || label || "Project media";
    return image;
  }

  function createPlaceholder(text) {
    const placeholder = document.createElement("div");
    placeholder.className = "placeholder";
    placeholder.textContent = text;
    return placeholder;
  }

  function setExternalAttrs(link, href) {
    if (href && /^https?:\/\//i.test(href)) {
      link.target = "_blank";
      link.rel = "noreferrer";
    }
  }

  function getResourceIcon(resource) {
    if (resource && resource.iconSrc) {
      return `<img src="${escapeHtml(resource.iconSrc)}" alt="" aria-hidden="true" />`;
    }

    const key = String((resource && (resource.icon || resource.label)) || "").toLowerCase();
    const icons = {
      paper:
        '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M6 2h8l5 5v15H6z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><path d="M14 2v6h5" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><path d="M8.4 16.8c2.7-.6 5.1-1.7 6.7-3.2M10.1 8.5c.9 3.6 2.4 6.1 4.6 7.6M8.4 16.8c-.8.4-1.2.9-1 1.3.2.5 1.2.2 1.9-.7" fill="none" stroke="currentColor" stroke-width="1.45" stroke-linecap="round"/></svg>',
      code:
        '<svg aria-hidden="true" viewBox="0 0 24 24"><path fill="currentColor" d="M12 .7a11.3 11.3 0 0 0-3.6 22c.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 .1.8 2.6 3.3 1.9.1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.6 0-1.2.4-2.2 1.2-3-.1-.3-.5-1.5.1-3 0 0 1-.3 3.1 1.1a10.7 10.7 0 0 1 5.6 0c2.2-1.4 3.1-1.1 3.1-1.1.6 1.5.2 2.7.1 3 .8.8 1.2 1.8 1.2 3 0 4.3-2.7 5.3-5.3 5.6.4.4.8 1.1.8 2.2v3.2c0 .4.2.7.8.6A11.3 11.3 0 0 0 12 .7z"/></svg>',
      arxiv:
        '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M6.2 5.1 17.8 18.9M17.8 5.1 6.2 18.9M8.8 3.7 12 7.5l3.2-3.8M8.8 20.3 12 16.5l3.2 3.8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    };

    return icons[key] || icons.paper;
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
})();
