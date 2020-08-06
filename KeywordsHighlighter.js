class KeywordsHighlighter {
  #defaultElementHTML;
  #textElement;
  #inputElement;
  accurateClass;
  inaccurateClass;


  constructor({
    textElement, 
    inputElement, 
    accurateClass = 'accurate', 
    inaccurateClass = 'inaccurate'
  } = {}) {
    this.#textElement = textElement;
    this.#inputElement = inputElement;

    this.#defaultElementHTML = textElement.innerHTML;

    this.accurateClass = accurateClass;
    this.inaccurateClass = inaccurateClass;

    this.#setInputEventListeners();
  }


  #setInputEventListeners() {
    document.addEventListener('click', e => {
      if (this.#inputElement.value.length > 2) {
        this.removeHighlighting();
        this.highlightMatchingWords();
      }
    });

    this.#inputElement.addEventListener('keyup', e => {
      if ( [37, 38, 39, 40].includes(e.keyCode) ) return;

      if (e.keyCode === 13) {
        this.removeHighlighting();
        this.highlightMatchingWords();

        return;
      }
  
      this.removeHighlighting();

      if (this.#inputElement.value.length > 2)
        this.highlightMatchingWords();
    });
  }


  highlightMatchingWords() {
    const strEscape = str => str.replace(/\\/g, '\\\\');

    let inaccurateReplacePattern = new RegExp(`([^>])(${strEscape(this.#inputElement.value)})`, 'gi');
    let accurateReplacePattern = new RegExp(`([^\\wа-я-]|^)(${strEscape(this.#inputElement.value)})`, 'gi');
  
    // Highlight accurate matches
    this.#textElement.innerHTML = this.#textElement.innerHTML.replace(
      accurateReplacePattern, `$1<span class="${this.accurateClass}">$2</span>`
    );

    // Highlight inaccurate matches, keeping in mind accurate elements 
    this.#textElement.innerHTML = this.#textElement.innerHTML.replace(
      inaccurateReplacePattern, `$1<span class="${this.inaccurateClass}">$2</span>`
    );
  }


  removeHighlighting() {
    this.#textElement.innerHTML = this.#defaultElementHTML;
  }
}