import dayjs from 'dayjs'
import localizaedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/pt-br'
dayjs.locale('pt-br')
dayjs.extend(localizaedFormat);

export { dayjs }