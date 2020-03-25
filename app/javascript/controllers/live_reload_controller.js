import { Controller } from 'stimulus';

export default class extends Controller {
  static targets = ['preview', 'input'];

  connect() {
    this.displayHTML();
  }

  displayHTML() {
    this.previewTarget.contentDocument.documentElement.innerHTML = this.updateHtml();
  }

  updateHtml() {
    let html = this.rawHtml;
    const variables = html.match(/(?<={{{)\w+(?=}}})/g);
    variables.forEach((variable) => {
      const input = this.inputTargets.find(input => input.name === variable);
      if (input) html = html.replace(`{{{${variable}}}}`, input.value);
    });
    return html;
  }

  get rawHtml() {
    return this.data.get('rawHtml');
  }
}
