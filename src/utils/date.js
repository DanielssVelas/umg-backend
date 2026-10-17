export default function makeDateManaguer({ moment }) {
  function getSysdate() {
    return moment().tz('America/Guatemala').format()
  }

  function formatDateISO(date) {
    return moment.tz(date, 'YYYY-MM-DD HH:mm:ss.S', 'America/Guatemala')
  }

  function formatDate(date) {
    return moment.tz(date, 'DD/MM/YYYY HH:mm', 'America/Guatemala')
  }

  function getDateAndTime() {
    const fechaActual = (moment().tz('America/Guatemala').format()).toString()
    const [date, parteHora] = fechaActual.split('T')
    const time = parteHora.slice(0, 8)
    // Formatear la fecha y el tiempo
    return {
      date,
      time
    }
  }

  function getDateAndTimeToken() {
    let fechaActual = moment().add(1, 'hours').add(2, 'minutes')
    fechaActual = fechaActual.tz('America/Guatemala').format()
    const [date, parteHora] = fechaActual.split('T')
    const time = parteHora.slice(0, 8)
    return {
      date,
      time
    }
  }

  return Object.freeze({
    getSysdate,
    getDateAndTime,
    getDateAndTimeToken,
    formatDateISO,
    formatDate
  })
}
