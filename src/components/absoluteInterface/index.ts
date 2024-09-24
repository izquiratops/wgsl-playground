import Shared from "../../services/shared";
import safeQuery from "../../utils/safeQuery";
import indexHtml from './index.html';

class AbsoluteInterface extends HTMLElement {
  constructor() {
    super();
  }
  
  connectedCallback() {
    this.innerHTML = indexHtml;

    const exitFullscreenButtonEl = safeQuery<HTMLButtonElement>('#exit-fullscreen-btn');
    exitFullscreenButtonEl.addEventListener('click', () => Shared.toggleFullscreen);
  }
}

customElements.define("absolute-interface", AbsoluteInterface);
export default AbsoluteInterface;