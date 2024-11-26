import { options as opt } from "./options";

export const config = (options: typeof opt) => {
  const alp: HTMLInputElement | null =
    document.querySelector("#alp-input-editor");
  if (alp) {
    alp.checked = false;
    alp.addEventListener("input", function f(e) {
      if (this.checked) {
        options.backgroundAlpha = 0.008;
        options.spawnTime = 100;
      } else {
        options.backgroundAlpha = opt.backgroundAlpha;
        options.spawnTime = opt.spawnTime;
      }
    });
  }
};
