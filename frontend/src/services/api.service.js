function mensajeDeError(data) {
  if (Array.isArray(data)) {
    return data.join("\n")
  }
  if (data?.message) {
    return data.message
  }
  return "Error en la solicitud"
}

function tokenGuardado() {
  try {
    return JSON.parse(localStorage.getItem("usuario"))?.token
  } catch {
    return undefined
  }
}

export function call(uri, method = "GET", body = undefined) {
  const url = import.meta.env.VITE_API_URL ?? "http://localhost:2026"
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + tokenGuardado(),
    },
  }

  if (body !== undefined) {
    options.body = JSON.stringify(body)
  }

  return fetch(url + uri, options).then(async (res) => {
    if (!res.ok) {
      let data = null
      try {
        data = await res.json()
      } catch {
        data = null
      }
      throw new Error(mensajeDeError(data))
    }
    return res.json()
  })
}
