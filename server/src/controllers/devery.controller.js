import devery from '../services/devery'

export const getApps = (req, res) => {
  return devery
    .getApps()
    .then(apps => res.sendSuccess(apps))
    .catch(err => res.sendError(err))
}

export const getAppByAddress = (req, res) => {
  const { address } = req.params
  return devery
    .getAppByAddress(address)
    .then(app => res.sendSuccess(app))
    .catch(err => res.sendError(err))
}
