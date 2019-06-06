import { App } from '../bootstrap/db'

class App {
  constructor () {
    this.app = App
  }

  save(address) {
    this.app
      .assign({ address })
      .write()
  }

  getAll() {
    return { address } = this.app
      .value()
  }
}

export default new App()
