const endpoints = {
    login: '/auth',
    register: '/register'
}


function endpointsWrapper() {
    if (false) {    // TODO: add production mode condition
        return endpoints
    } else {
        const prefix = '/api'
        const prefixedEndpoints = {}
        Object.keys(endpoints).forEach(key => {
            prefixedEndpoints[key] = prefix + endpoints[key]
        })
        return prefixedEndpoints
    }
}

export default endpointsWrapper()