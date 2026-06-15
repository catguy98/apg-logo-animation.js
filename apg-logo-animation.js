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

  class ApgLogoAnimation extends HTMLElement {
    connectedCallback() {
      if (this.dataset.ready === "true") return;

      this.dataset.ready = "true";
      this.currentStep = 0;
      this.totalSteps = 10;
      this.isAnimating = false;
      this.wheelHandler = null;

      this.render();

      this.loadGsap()
        .then(() => {
          setTimeout(() => this.initAnimation(), 300);
        })
        .catch((error) => {
          console.error("APG animation failed:", error);
        });
    }

    disconnectedCallback() {
      const stage = this.querySelector(".apg-stage");

      if (stage && this.wheelHandler) {
        stage.removeEventListener("wheel", this.wheelHandler);
      }
    }

    render() {
      this.innerHTML = `
        <style>
          :host {
            display: block;
            width: 100%;
            height: 650px;
            font-family: Montserrat, Arial, sans-serif;
          }

          * {
            box-sizing: border-box;
          }

          .apg-stage {
            position: relative;
            width: 100%;
            height: 650px;
            overflow: hidden;
            border-radius: 16px;
            background:
              radial-gradient(circle at 78% 30%, rgba(78, 205, 196, 0.32), transparent 42%),
              linear-gradient(120deg, #fffaf4 0%, #fbfbf8 45%, #d9f5f1 100%);
          }

          .apg-stage::before,
          .apg-stage::after {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
          }

          .apg-stage::before {
            background:
              linear-gradient(130deg, transparent 0%, transparent 35%, rgba(255,255,255,0.65) 36%, transparent 39%),
              linear-gradient(145deg, transparent 0%, transparent 50%, rgba(255,255,255,0.42) 51%, transparent 53%);
            opacity: 0.8;
          }

          .apg-stage::after {
            background:
              radial-gradient(circle at 26% 20%, rgba(255,255,255,0.75), transparent 28%),
              radial-gradient(circle at 62% 24%, rgba(255,255,255,0.36), transparent 32%);
            opacity: 0.8;
          }

          .apg-copy {
            position: absolute;
            left: 8%;
            top: 350px;
            width: 360px;
            z-index: 8;
          }

          .apg-copy h2 {
            margin: 0 0 22px;
            color: #001d36;
            font-size: clamp(28px, 3vw, 36px);
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
            left: 13%;
            top: 80px;
            transform: rotate(-9deg);
          }

          .logo-clear {
            left: 24%;
            top: 88px;
            transform: rotate(-8deg);
          }

          .logo-google {
            left: 11%;
            top: 230px;
            transform: rotate(-10deg);
          }

          .logo-chatgpt {
            left: 25%;
            top: 210px;
            transform: rotate(7deg);
          }

          .logo-anthropic {
            left: 38%;
            top: 145px;
            transform: rotate(8deg);
          }

          .logo-salesforce {
            left: 50%;
            top: 225px;
            transform: rotate(-8deg);
          }

          .logo-azure {
            left: 64%;
            top: 160px;
            transform: rotate(8deg);
          }

          .logo-bubble {
            left: 70%;
            top: 285px;
            transform: rotate(8deg);
          }

          .logo-aws {
            left: 82%;
            top: 260px;
            transform: rotate(-12deg);
          }

          .apg-box {
            position: absolute;
            right: 6%;
            bottom: -5px;
            width: clamp(390px, 43%, 500px);
            z-index: 6;
            pointer-events: none;
            user-select: none;
          }

          .apg-instruction {
            position: absolute;
            right: 26px;
            bottom: 22px;
            z-index: 20;
            padding: 8px 12px;
            border-radius: 999px;
            background: rgba(255,255,255,0.72);
            color: rgba(0,29,54,0.62);
            font-size: 12px;
            font-weight: 700;
            backdrop-filter: blur(8px);
            opacity: 0;
            pointer-events: none;
            transition: opacity 250ms ease;
          }

          .apg-stage:hover .apg-instruction {
            opacity: 1;
          }

          @media (max-width: 767px) {
            :host {
              height: 560px;
            }

            .apg-stage {
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

            .apg-instruction {
              display: none;
            }
          }
        </style>

        <div class="apg-stage">
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

          <div class="apg-instruction">Scroll over this section</div>
        </div>
      `;
    }

    loadScript(src, id) {
      return new Promise((resolve, reject) => {
        const existingScript = document.getElementById(id);

        if (existingScript) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = src;
        script.id = id;
        script.async = true;

        script.onload = resolve;
        script.onerror = reject;

        document.head.appendChild(script);
      });
    }

    async loadGsap() {
      if (window.gsap) return;

      await this.loadScript(
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js",
        "gsap-core-apg"
      );
    }

    getLogoStates() {
      const stage = this.querySelector(".apg-stage");
      const box = this.querySelector(".apg-box");

      if (!stage || !box) return [];

      const logoSettings = [
        { selector: ".logo-oracle", tx: 0.27, ty: 0.15, finalRotation: 10 },
        { selector: ".logo-clear", tx: 0.36, ty: 0.16, finalRotation: -8 },
        { selector: ".logo-google", tx: 0.22, ty: 0.19, finalRotation: 8 },
        { selector: ".logo-chatgpt", tx: 0.31, ty: 0.20, finalRotation: -7 },
        { selector: ".logo-anthropic", tx: 0.40, ty: 0.18, finalRotation: 9 },
        { selector: ".logo-salesforce", tx: 0.49, ty: 0.19, finalRotation: -6 },
        { selector: ".logo-azure", tx: 0.58, ty: 0.17, finalRotation: 7 },
        { selector: ".logo-bubble", tx: 0.64, ty: 0.21, finalRotation: -8 },
        { selector: ".logo-aws", tx: 0.72, ty: 0.20, finalRotation: 10 }
      ];

      return logoSettings
        .map((item) => {
          const logo = this.querySelector(item.selector);

          if (!logo) return null;

          const targetLeft =
            box.offsetLeft + box.offsetWidth * item.tx - logo.offsetWidth / 2;

          const targetTop =
            box.offsetTop + box.offsetHeight * item.ty - logo.offsetHeight / 2;

          return {
            logo,
            x: targetLeft - logo.offsetLeft,
            y: targetTop - logo.offsetTop,
            rotation: item.finalRotation
          };
        })
        .filter(Boolean);
    }

    goToStep(nextStep) {
      if (!window.gsap) return;

      this.currentStep = Math.max(0, Math.min(this.totalSteps, nextStep));

      const progress = this.currentStep / this.totalSteps;
      const states = this.getLogoStates();

      this.isAnimating = true;

      states.forEach((item) => {
        gsap.to(item.logo, {
          x: item.x * progress,
          y: item.y * progress,
          scale: 1 - progress * 0.84,
          rotation: item.rotation * progress,
          opacity: 1 - progress,
          duration: 0.45,
          ease: "power2.out",
          overwrite: true
        });
      });

      window.setTimeout(() => {
        this.isAnimating = false;
      }, 460);
    }

    initAnimation() {
      if (!window.gsap) return;

      const stage = this.querySelector(".apg-stage");

      if (!stage || window.innerWidth < 768) return;

      this.goToStep(0);

      this.wheelHandler = (event) => {
        const scrollingDown = event.deltaY > 0;
        const scrollingUp = event.deltaY < 0;

        const canAdvance = scrollingDown && this.currentStep < this.totalSteps;
        const canReverse = scrollingUp && this.currentStep > 0;

        if (canAdvance || canReverse) {
          event.preventDefault();
          event.stopPropagation();

          if (this.isAnimating) return;

          this.goToStep(scrollingDown ? this.currentStep + 1 : this.currentStep - 1);
        }
      };

      stage.addEventListener("wheel", this.wheelHandler, { passive: false });

      window.addEventListener("resize", () => {
        this.goToStep(this.currentStep);
      });

      console.log("APG wheel-step animation loaded");
    }
  }

  customElements.define(TAG_NAME, ApgLogoAnimation);
})();
