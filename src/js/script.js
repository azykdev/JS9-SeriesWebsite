import clas from '../modules/clas'
import form from '../modules/form'
import loader from '../modules/loader'
import modal, { showModal } from '../modules/modal'
import slider from '../modules/slider'
import tab from '../modules/tab'
import timer from '../modules/timer'

const modalTimerId = setTimeout(() => showModal('.modal', modalTimerId), 5000)

loader()
clas()
form()
modal("[data-modal]", ".modal", modalTimerId)
slider()
tab()
timer()
