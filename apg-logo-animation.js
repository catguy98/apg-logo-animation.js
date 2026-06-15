(function () {
  const TAG_NAME = "apg-logo-animation";

  if (customElements.get(TAG_NAME)) {
    return;
  }

  const ASSETS = {
    box: "https://static.wixstatic.com/media/e25301_63b415ff2d66456999167b43e5b9afa4~mv2.webp",

    salesforce: "https://static.wixstatic.com/shapes/e25301_5010fa05452e40a092bb9c8be9c3c3b9.svg",
    googleCloud: "https://static.wixstatic.com/shapes/e25301_e930b3aad1cf4410a30944edaadf8cd9.svg",
    oracle: "https://static.wixstatic.com/shapes/e25301_660cf1bf66284d5b82f680c44b0dc979.svg",
    clear: "https://static.wixstatic.com/shapes/e25301_2035fe7db9b342978c2bacd4692570a5.svg",
    chatgpt: "https://static.wixstatic.com/shapes/e25301_b998121b7ca549e6b472bebf169061df.svg",
    aws: "https://static.wixstatic.com/shapes/e25301_0edfc3302752438392454ab312a368bb.svg",
    azure: "https://static.wixstatic.com/shapes/e25301_c7c90f4750624539b026f7780d0d53e2.svg",
    anthropic: "https://static.wixstatic.com/shapes/e25301_fc6391c3bc4548e1b70d9569fe61ea0d.svg",
    bubble: "https://static.wixstatic.com/shapes/e25301_bb3e4775f0a248bbaf249ad19b334373.svg"
  };

  const PIN_TOP = 90;
  const STEP_COUNT = 10;

  class ApgLogoAnimation extends HTMLElement {
    connectedCallback() {
      if (this.dataset.ready === "true") {
        return;
      }

      this.dataset.ready = "true";
      this.render();

      this.loadGsap()
        .then(() => this.initAnimation())
        .catch((error) => {
          console.error("APG animation failed to load:", error);
        });
    }

    render() {
      this.innerHTML = `
        <style>
          :host {
            display: block;
            width: 100%;
            height: 3200px;
            font-family: Montserrat, Arial, sans-serif;
          }

          * {
            box-sizing: border-box;
          }

          .apg-scroll-wrap {
            position: relative;
            width: 100%;
            height: 3200px;
            max-width: 1300px;
            margin: 0 auto;
          }

          .apg-stage {
            position: sticky;
            top: ${PIN_TOP}px;
            width: 100%;
            height: 650px;
            overflow: hidden;
            border-radius: 16px;
            background:
              radial-gradient(circle at 78% 28%, rgba(78, 205, 196, 0.30), transparent 42%),
              linear-gradient(120deg, #fffaf4 0%, #f9fbf8 46%, #d8f5f1 100%);
          }

          .apg-soft-lines {
            position: absolute;
            inset: 0;
            pointer-events: none;
            opacity: 0.75;
            background:
              linear-gradient(130deg, transparent 0%, transparent 35%, rgba(255,255,255,0.65) 36%, transparent 39%),
              linear-gradient(145deg, transparent 0%, transparent 50%, rgba(255,255,255,0.45) 51%, transparent 53%);
          }

          .apg-copy {
            position: absolute;
            left: 95px;
            top: 350px;
            width: 430px;
            z-index: 8;
          }

          .apg-copy h2 {
            margin: 0 0 22px;
            color: #001d36;
            font-size: 36px;
            line-height: 1.28;
            font-weight: 800;
            letter-spacing: -0.02em;
          }

          .apg-copy a {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 12px 24px;
            border-radius: 999px;
            background: #2fbdb5;
            color: #ffffff;
            text-decoration: none;
            font-size: 16px;
            font-weight: 700;
          }

          .apg-logo {
            position: absolute;
            width: 78px;
            height: 78px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 13px;
            background: #ffffff;
            box-shadow: 0 14px 30px rgba(6, 38, 68, 0.13);
            transform-origin: center center;
            will-change: transform, opacity;
            z-index: 4;
          }

          .apg-logo img {
            max-width: 74%;
            max-height: 74%;
            display: block;
            pointer-events: none;
          }

          .logo-oracle,
          .logo-clear,
          .logo-anthropic,
          .logo-aws {
            background: transparent;
            box-shadow: 0 14px 30px rgba(6, 38, 68, 0.10);
          }

          .logo-oracle img,
          .logo-clear img,
          .logo-anthropic img,
          .logo-aws img {
            max-width: 100%;
            max-height: 100%;
          }

          .logo-oracle {
            left: 150px;
            top: 72px;
            transform: rotate(-9deg);
          }

          .logo-clear {
            left: 260px;
            top: 82px;
            transform: rotate(-8deg);
          }

          .logo-google {
            left: 115px;
            top: 230px;
            transform: rotate(-10deg);
          }

          .logo-chatgpt {
            left: 255px;
            top: 205px;
            transform: rotate(7deg);
          }

          .logo-anthropic {
            left: 385px;
            top: 145px;
            transform: rotate(8deg);
          }

          .logo-salesforce {
            left: 500px;
            top: 215px;
            transform: rotate(-8deg);
          }

          .logo-azure {
            left: 640px;
            top: 160px;
            transform: rotate(8deg);
          }

          .logo-bubble {
            left: 715px;
            top: 285px;
            transform: rotate(8deg);
          }

          .logo-aws {
            left: 820px;
            top: 260px;
            transform: rotate(-12deg);
          }

          .apg-box {
            position: absolute;
            right: 78px;
            bottom: -5px;
            width: 500px;
            z-index: 6;
            pointer-events: none;
            user-select: none;
          }

          @media (max-width: 767px) {
            :host {
              height: 720px;
            }

            .apg-scroll-wrap {
              height: 720px;
            }

            .apg-stage {
              position: relative;
              top: 0;
              height: 560px;
            }

            .apg-copy {
              left: 26px;
              top: 300px;
              width: 300px;
            }

            .apg-copy h2 {
              font-size: 26px;
            }

            .apg-logo {
              width: 56px;
              height: 56px;
            }

            .apg-box {
              width: 330px;
              right: 10px;
              bottom: -6px;
            }
          }
        </style>

        <div class="apg-scroll-wrap">
          <div class="apg-stage">
            <div class="apg-soft-lines"></div>

            <div class="apg-logo logo-oracle">
              <img src="${ASSETS.oracle}" alt="">
            </div>

            <div class="apg-logo logo-clear">
              <img src="${ASSETS.clear}" alt="">
            </div>

            <div class="apg-logo logo-google">
              <img src="${ASSETS.googleCloud}" alt="">
            </div>

            <div class="apg-logo logo-chatgpt">
              <img src="${ASSETS.chatgpt}" alt="">
            </div>

            <div class="apg-logo logo-anthropic">
              <img src="${ASSETS.anthropic}" alt="">
            </div>

            <div class="apg-logo logo-salesforce">
              <img src="${ASSETS.salesforce}" alt="">
            </div>

            <div class="apg-logo logo-azure">
              <img src="${ASSETS.azure}" alt="">
            </div>

            <div class="apg-logo logo-bubble">
              <img src="${ASSETS.bubble}" alt="">
            </div>

            <div class="apg-logo logo-aws">
              <img src="${ASSETS.aws}" alt="">
            </div>

            <div class="apg-copy">
              <h2>We proudly work<br>with these software<br>platforms and more</h2>
              <a href="#">Book a Call ↗</a>
            </div>

            <img class="apg-box" src="${ASSETS.box}" alt="">
          </div>
        </div>
      `;
    }

    loadScript(src, id) {
      return new Promise((resolve, reject) => {
        const existingScript = document.getElementById(id);

        if (existingScript) {
          if (existingScript.dataset.loaded === "true") {
            resolve();
            return;
          }

          existingScript.addEventListener("load", resolve);
          existingScript.addEventListener("error", reject);
          return;
        }

        const script = document.createElement("script");
        script.src = src;
        script.id = id;
        script.async = true;

        script.onload = () => {
          script.dataset.loaded = "true";
          resolve();
        };

        script.onerror = reject;

        document.head.appendChild(script);
      });
    }

    async loadGsap() {
      if (window.gsap && window.ScrollTrigger) {
        return;
      }

      await this.loadScript(
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js",
        "gsap-core-apg"
      );

      await this.loadScript(
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js",
        "gsap-scrolltrigger-apg"
      );
    }

    initAnimation() {
      if (!window.gsap || !window.ScrollTrigger) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const wrap = this.querySelector(".apg-scroll-wrap");
      const stage = this.querySelector(".apg-stage");

      if (!wrap || !stage) {
        return;
      }

      if (window.innerWidth < 768) {
        return;
      }

      const logos = [
        {
          selector: ".logo-oracle",
          finalRotation: 10,
          targetOffsetX: 120,
          targetOffsetY: 46
        },
        {
          selector: ".logo-clear",
          finalRotation: -8,
          targetOffsetX: 155,
          targetOffsetY: 62
        },
        {
          selector: ".logo-google",
          finalRotation: 8,
          targetOffsetX: 88,
          targetOffsetY: 84
        },
        {
          selector: ".logo-chatgpt",
          finalRotation: -7,
          targetOffsetX: 135,
          targetOffsetY: 96
        },
        {
          selector: ".logo-anthropic",
          finalRotation: 9,
          targetOffsetX: 175,
          targetOffsetY: 76
        },
        {
          selector: ".logo-salesforce",
          finalRotation: -6,
          targetOffsetX: 215,
          targetOffsetY: 92
        },
        {
          selector: ".logo-azure",
          finalRotation: 7,
          targetOffsetX: 250,
          targetOffsetY: 70
        },
        {
          selector: ".logo-bubble",
          finalRotation: -8,
          targetOffsetX: 275,
          targetOffsetY: 112
        },
        {
          selector: ".logo-aws",
          finalRotation: 10,
          targetOffsetX: 306,
          targetOffsetY: 100
        }
      ];

      const boxLeft = stage.clientWidth - 78 - 500;
      const boxTop = stage.clientHeight - 265;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: `top top+=${PIN_TOP}`,
          end: () => `+=${wrap.offsetHeight - stage.offsetHeight}`,
          scrub: 0.35,
          invalidateOnRefresh: true,
          snap: {
            snapTo: "labelsDirectional",
            delay: 0.04,
            duration: {
              min: 0.12,
              max: 0.28
            },
            ease: "power1.out"
          }
        }
      });

      for (let i = 0; i <= STEP_COUNT; i++) {
        tl.addLabel(`step-${i}`, i);
      }

      logos.forEach((item) => {
        const logo = this.querySelector(item.selector);

        if (!logo) {
          return;
        }

        const targetLeft = boxLeft + item.targetOffsetX;
        const targetTop = boxTop + item.targetOffsetY;

        const moveX = targetLeft - logo.offsetLeft;
        const moveY = targetTop - logo.offsetTop;

        tl.to(
          logo,
          {
            x: moveX,
            y: moveY,
            scale: 0.16,
            rotation: item.finalRotation,
            opacity: 0,
            ease: "none",
            duration: STEP_COUNT
          },
          0
        );
      });

      ScrollTrigger.refresh();
    }
  }

  customElements.define(TAG_NAME, ApgLogoAnimation);
})();