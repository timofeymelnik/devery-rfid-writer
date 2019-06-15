import Auth from './auth'
import api from './api'
import { DeveryRegistry, Utils } from '@devery/devery'

let devery = new DeveryRegistry()

export const utils = Utils

export async function addApp (name) {
  if (!Auth.isAddressValid()) return Promise.reject()

  try {
    const address = Auth.getAddress()

    await devery.addApp(name, address, 0)
    await devery.permissionMarker(address, true)

    return Promise.resolve()
  } catch (e) {
    console.error(e)
  }
}

export async function addBrand (name) {
  if (!Auth.isAddressValid()) return Promise.reject()

  try {
    return devery.addBrand(Auth.getAddress(), name)
  } catch(e) {
    console.error(e)
  }
}

export async function addProduct (name) {
  if (!Auth.isAddressValid()) return Promise.reject()

  try {
    const date = new Date()
    const { success, data } = await api.get('/api/account')

    if (!success) return

    const { origin } = data

    return devery.addProduct(
      Auth.getAddress(),
      name,
      '',
      date.getFullYear(),
      origin
    )
  } catch (err) {
    console.error(err)
  }
}
