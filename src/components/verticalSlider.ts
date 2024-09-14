class VerticalSlider extends HTMLElement {
    private editorContainerEl!: HTMLTextAreaElement;

    private resizeCanvasEvent = (e: MouseEvent) => {
        this.editorContainerEl.style.width = `${e.clientX}px`;
    }
    
    constructor() {
        super();
    }
    
    connectedCallback() {
        this.editorContainerEl = document.querySelector('.editor-container') as HTMLTextAreaElement;

        this.addEventListener('mousedown', (event) => {
            // Avoid this event to trigger other stuff like text selection
            event.preventDefault();
            document.addEventListener('mousemove', this.resizeCanvasEvent);
        });
        
        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', this.resizeCanvasEvent);
        });
    }
}

customElements.define("vertical-slider", VerticalSlider);
export default VerticalSlider;