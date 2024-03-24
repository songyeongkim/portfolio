import PhotoSwipeLightbox from "photoswipe/lightbox";
import PhotoSwipe from "photoswipe";
import PhotoSwipeDynamicCaption from "photoswipe-dynamic-caption-plugin";
import * as params from "@params";

const gallery = document.getElementById("gallery");

if (gallery) {
  const lightbox = new PhotoSwipeLightbox({
    gallery,
    children: ".gallery-item",
    showHideAnimationType: "zoom",
    bgOpacity: 1,
    pswpModule: PhotoSwipe,
    imageClickAction: "close",
    paddingFn: (viewportSize) => {
      return viewportSize.x < 700
        ? {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }
        : {
            top: 30,
            bottom: 30,
            left: 0,
            right: 0,
          };
    },
    closeTitle: params.closeTitle,
    zoomTitle: params.zoomTitle,
    arrowPrevTitle: params.arrowPrevTitle,
    arrowNextTitle: params.arrowNextTitle,
    errorMsg: params.errorMsg,
    videolink: params.videourl
  });

  /* �ٿ�ε� ��ư

  lightbox.on("uiRegister", () => {
    lightbox.pswp.ui.registerElement({
      name: "download-button",
      order: 8,
      isButton: true,
      tagName: "a",
      html: {
        isCustomSVG: true,
        inner: '<path d="M20.5 14.3 17.1 18V10h-2.2v7.9l-3.4-3.6L10 16l6 6.1 6-6.1ZM23 23H9v2h14Z" id="pswp__icn-download"/>',
        outlineID: "pswp__icn-download",
      },
      onInit: (el, pswp) => {
        el.setAttribute("download", "");
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener");
        el.setAttribute("title", params.downloadTitle || "Download");
        pswp.on("change", () => {
          el.href = pswp.currSlide.data.element.href;
        });
      },
    });
  });

  */
    lightbox.addFilter('itemData', (itemData, index) => {
        const videoUrl = itemData.element.dataset.videoUrl;
        if (videoUrl) {
            itemData.videoUrl = videoUrl;
        }
        return itemData;
    });
    

    
    lightbox.on('contentLoad', (e) => {
        const { content } = e;
        if (content.type === 'pswp-video') {
            // prevent the deafult behavior
            e.preventDefault();

            // Create a container for iframe
            // and assign it to the `content.element` property
            content.element = document.createElement('div');
            content.element.className = 'pswp__video-container';

            const iframe = document.createElement('iframe');
            iframe.setAttribute('allowfullscreen', '');
            iframe.setAttribute('src', content.data.videoUrl);
            console.log( content.data.videoUrl );
            content.element.appendChild(iframe);

            const div = document.createElement('div');
            //const img = document.createElement('img');
            const loaddiv = document.createElement('div');
            const loadicon = document.createElement('div');
            loadicon.setAttribute('class', 'loader');
            div.setAttribute('id', 'readytoloadtxt');
            //img.src = content.data.src
            //이미지로 대체할 방법?
            //div.appendChild(img);
            div.appendChild(loaddiv);
            loaddiv.appendChild(loadicon);
            content.element.appendChild(div);

            iframe.addEventListener('load', function(){
              div.style.display = 'none';
            });
        }
    });
    

  lightbox.on("change", () => {
    history.replaceState("", document.title, "#" + lightbox.pswp.currSlide.index);
  });

  lightbox.on("close", () => {
    history.replaceState("", document.title, window.location.pathname);
  });

  new PhotoSwipeDynamicCaption(lightbox, {
    mobileLayoutBreakpoint: 700,
    type: "auto",
    mobileCaptionOverlapRatio: 1,
  });

  lightbox.init();

  if (window.location.hash.substring(1).length > 0) {
    const index = parseInt(window.location.hash.substring(1), 10);
    if (!Number.isNaN(index) && index >= 0 && index < gallery.querySelectorAll("a").length) {
      lightbox.loadAndOpen(index, { gallery });
    }
  }
}
