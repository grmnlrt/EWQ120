import { Controller } from 'stimulus';

export default class extends Controller {
  static targets = ['preview', 'input']

  connect() {
    this.displayHtml();
  }

  displayHtml() {
    this.previewTarget.contentDocument.documentElement.innerHTML = this.updateHtml();
  }

  updateHtml() {
    let html = this.rawHtml;
    const variables = html.match(/(?<={{{)\w+(?=}}})/g);
    variables.forEach((variable) => {
      const input = this.inputTargets.find(input => input.name === variable);
      if (input) html = html.replace(`{{{${variable}}}}`, input.value);
    })
    return html;
  }

  get rawHtml() {
    // simulates a fetch() to sendgrid API
    return this.data.get('rawHtml');
  }
}
